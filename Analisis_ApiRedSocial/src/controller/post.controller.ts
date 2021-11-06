import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

import Publication from '../models/publication.model';
import User from '../models/usuario.models';
import Friends from '../models/friends.model';
const removeFile = require('../service/deleteFile');
import { exists } from'fs';

export const pruebaPost = (req: Request, res: Response) => {
    res.status(200).send({message: 'hello from controller post'})
}

//crear nuevas publicaciones
export const savePost = async (req: Request, res: Response) => {
    const data = req.body;

    if(!data.text){
        return res.status(200).send({message: 'send text'})
    }

    const publication = new Publication;
    publication.text = data.text;
    publication.file =  'null';
    publication.user = req.userPayload.id; 
    publication.createdAt = moment().unix();
    publication.private = data.private;
    
    try{
        const publicationStore = await publication.save();
        
        if(!publicationStore) return res.status(404).send({ message: 'not save data post'});
        return res.status(200).send({publication: publicationStore});
    } catch(err: any){
        return res.status(500).send({Message: [err.message, ' ==> error at save data']});
    }
}

//list post aplication
export const getPublication = async (req: Request, res: Response)=> {
    const id = req.userPayload.id;
    let page: number = 1;
    let itemsPage = 10;

    if(req.params.page) page =+ req.params.page;
    let friendIdArray: any = [];
    let postFriend;
    try {
        postFriend = await Friends.find({user: id}).populate('friends');
        if(!postFriend) return res.status(404).send({message: 'not friends found'});

        postFriend.forEach((friend: any) => {
            friendIdArray.push(friend.friends)
        });
        //buscar las publicaciones de los usuarios que estan en el array 
        const publicationData = await Publication.paginate({user: {"$in": friendIdArray}},
        {sort: '-createdAt', page: page, populate: 'user'});

        if(!publicationData) return res.status(404).send({message: 'no post'});
        return res.status(200).send({
            publicationData
        })
    } catch (err: any) {
        return res.status(500).send({message: [err.message, " ==> error in the query of consult post friend"]});
    }
}

//get publication by id
export const getPublicationId = async (req: Request, res: Response) => {
    const idPublication = req.query.id;
    try {
        const publication = await Publication.findById(idPublication);
        if(!idPublication) return res.status(404).send({message: "No publication found"});

        return res.status(200).send({publication});
    } catch(err: any) {
        return res.status(500).send({message: [err.message, " ==> Error to the get publication by id"]})
    }
}

//delete publication by id
export const deletePublication = async (req: Request, res: Response) => {
    const idPost = req.params.id;
    const userIdLog = req.userPayload.id
    try {
        

        const deleteds1 = await Publication.deleteOne({'user': userIdLog, '_id': idPost})
        console.log(deleteds1);
        if(deleteds1.deletedCount == 0) return res.status(404).send({'message': 'not exist element delete'})
        return res.status(200).send({message: 'post delete'});
    } catch (err: any) {
        return res.status(500).send({message: [err.message, " ==> Error to the delete publication by id"]})
    }
}


//upload image post
export const uploadImgPost = async (req: Request, res: Response) => {
    console.log('entre xd')
    const idPar = req.params.id;    
    const userId = req.userPayload.id;

    if(req.file){
        let file_path = req.file?.path;
        let file_split_path = file_path.split('\\');  
        console.log(file_split_path)  
        let file_name = file_split_path[10];
        console.log(file_name)  
        let file_name_split = file_name.split('.');
        let file_ext = file_name_split[1];

        /*if(idPar != req.userPayload.id){
            console.log('entre a la validacion por que el usuario no es valido')
            return removeFile(res, file_path, 'yoy do not have persmission to upload img in user')
        }*/
        
        //comprobar tipo de archivo
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
            //update publication user document
            
            try {
                const validatorUser = await Publication.findOne({'user': userId, '_id': idPar});
                if(!validatorUser) return res.status(404).send({message: 'the publication does not belong to the user'});

                if(validatorUser){
                    const imgUpdate = await Publication.findByIdAndUpdate(idPar, {file: file_name}); /* , (err: any, userUpdateImg) => {*/

                        if(!imgUpdate) return res.status(404).send({message: 'user could not be updated'});
                        console.log(`== SE SALIO ALV ==`)
                        return res.status(200).send({message: imgUpdate})
                }

            } catch(err: any){
                return res.status(500).send({message: [err.message, " ==> error to the update image"]})
            }
            
                
                
                
                
                
            
        } else {
            //delete file.img of upload 
            console.log('entre a la validacion por que el usuario no es valido')
            return removeFile(res, file_path, 'Archivo no valido - extencion')
        }


    } else {
        return res.status(403).send({message: 'there is no image in the file'})
    }
    return res.status(200).send({message: 'image upload'})
}

//get image file 
export const getImageFile = (req: Request, res: Response) => {
    const imageFile = req.params.img;
    const pathFile = path.join(__dirname, '../../../upload/user', imageFile);
    console.log(path.join(__dirname, '../../../upload/user'));


    exists(pathFile, (exists) => {
        if(exists){
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({message: 'image not exists'});
        }
    })
    
}