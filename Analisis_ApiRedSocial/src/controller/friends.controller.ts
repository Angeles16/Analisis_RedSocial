import { Request, Response } from'express';
import mongoose  = require('mongoose');
import Friends, {IFriends} from'../models/friends.model';
import User from '../models/usuario.models';
var ObjectId = require('mongoose').Types.ObjectId; 

export const testFriends = (req: Request, res: Response) => {
    res.status(200).send({message: 'hello from tests'})
}   

//add friends
export const saveFriends = async (req: Request, res: Response) => {
    const data = req.body;
    const id = req.userPayload.id;
    console.log(data.friend)
    const objId = data.friend;
    console.log(objId)
    const friends = new Friends();

    try{
        const x = await Friends.findOne({"friends": ObjectId(`${objId}`), "user": ObjectId(`${id}`)});
        console.log(x)

        if(x){
            return res.status(200).send({message: 'el usuario ya esta en tu lista de amigos'})
        } 
            let userIdLog = new mongoose.Types.ObjectId(req.userPayload.id);
            let userIdFriend = new mongoose.Types.ObjectId(data.friend);

            friends.user = userIdLog;
            friends.friends = userIdFriend;

    
        const friendsSave = await friends.save();
        if(!friendsSave){
            return res.status(404).send({ message: 'no se gusrdo ningun dato'})
        }
        return res.status(200).send({ friends: friendsSave});
        


    } catch (err: any ){
        console.log(err)
        return res.status(500).send({message: err.message})
    }


    
    
}

//delete friends
export const deleteFriends = async (req: Request, res: Response) => {
    const userId = req.userPayload.id;
    const friendId = req.params.id;

    try{
        const friendDelete = await Friends.deleteOne({'user': userId, 'friends': friendId});
        console.log(friendDelete);
        if(friendDelete == undefined) {
            return res.status(404).send({message: 'user dnot friend'})
        }
        return res.status(200).send({message: 'the friend has been eliminated'});
    } catch(err:any) {
        res.status(500).send({message: [err.message, " ==> erroe in the delete"]});
    }
}

//paginate friends 
export const paginateFriends = async (req: Request, res: Response) => {
    let userId = req.userPayload.id; 
    let pag: number = 1

    if(req.query.id) { 
        userId = req.query.id;
        console.log('query id ==> ' + userId);
    }

    if(req.query.pag){
        pag = +req.query.pag;
        console.log('query pag ==> ' + pag);
    }

    let limit: number = 10; //items per page
    console.log(req.userPayload.id);
    try{
        const friendPaginate = await Friends.paginate({user: userId},{sort: '_id', limit: limit, page: pag, populate: {path: 'friends'}});
        //const friendPaginate = await Friends.find({user: userId}).populate({path: 'friends'});

        if(!friendPaginate) return res.status(401).send({message: 'no friends added'});

        return res.status(200).send({friends: friendPaginate});
    } catch(err: any){
        return res.status(500).send({message: [err.message, "error in the paginate"]});
    }
    

    

}

//get usersinpaginar
export const getFriends = async (req: Request, res: Response) => {
    let id = req.userPayload.id;
    if(req.query.id){
        id = req.query.id;
    }

    try {
        const friends = await Friends.find({user: id}).populate({path: 'user friends'});
        if(!friends) {
            return res.status(404).send({message: 'you do not have friends'});
        }
        friendUserId(id).then((value) => {
            console.log(value[1]);
            return res.status(200).send({
                
                user: friends,
                userFriend: value,
                friend: friends
            });
        })
       
    } catch(err: any) {
        return res.status(500).send({message: [err.message, '  ==> error in the query friends']})
    }
}
async function friendUserId(userId: any){
    let friends;
    try{
        friends = await Friends.find({"user": userId}).select({'_id': 0, '__v': 0, 'user': 0});
        
    } catch (err: any) {
        return err;
    }
    const friendsClean: any = [];

        friends.forEach((friend) =>{
            console.log(friend)
            friendsClean.push(friend.friends);
        })
        return friendsClean;
    /*return {
        friends: friends
    }*/
}

export const getCountFriends = (req: Request, res: Response) => {
    let id = req.userPayload.id;
    if(req.params.id){
        id = req.params.id;
    }
    getContFriend(id).then((value)=> {
        console.log(value);
        return res.status(200).send(value);
    })
}
async function getContFriend(userId: any){
    
    try {
        const friendC = await Friends.count({"user": userId});
        console.log(friendC)
        return {
            friendC: friendC
        }
    } catch(err: any){
        return err + " ==> Error in the conunt data";
    }
    
}