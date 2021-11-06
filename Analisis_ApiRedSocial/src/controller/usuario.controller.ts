import {Request, Response} from 'express';
import User, {IUser} from '../models/usuario.models';
import config from '../config/config';
import jwt = require('../service/jwt');
const path = require('path');
const fs = require('fs');
import { exists } from'fs';
const removeFile = require('../service/deleteFile');



export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.nombre || !req.body.apellido || !req.body.nick || !req.body.email || !req.body.password) {
        return res.status(400).json({mensaje: 'Please. write your data'})
    }
    //comprobar si no existe el correo 
    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({mensaje: 'The user already exist'});
    }

    const newUser = new User(req.body);
    console.log(newUser);
    newUser.save();
    return res.status(200).json({newUser});
}

export const signIg = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).json({mensaje: 'please enter your data'});
    }
    //Consultar data user: any
    const user: any = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).json({mensaje: 'the password or email are incorrect'});
    }

    const isMatch = await user?.comparePassword(req.body.password);
    if(isMatch) {
        return res.status(200).json([{token: jwt.createToken(user)},{user}])
    }   
    return res.status(400).json({mensaje: 'the email or password are incorrect'});
}

//pruebas
export const consulta = async (req: Request, res: Response) => {
    const {id} = req.query;
    console.log('entre a la consulta por usauario ==> ' + id)
    try {
        const user = await User.find({_id: id});
        if(!user) return res.status(404).send({message: 'No existen usuarios'});
        return res.status(200).json({user});
    } catch( err: any) {
        return res.status(500).send({mensaje: err.message});
    }
}

//get user spesific data
export const getUser = (req: Request, res: Response) => {
    let userId = req.params.id;

    User.findById(userId, (err: any, user: any) => {
        if(err) return res.status(500).send({mensaje: "query Error"});
        if(!user) return res.status(404).send({mensaje: "User not exist"});

        return res.status(200).send({ user })
    });
}

//==============> este es SACAR DATOS DEL TOKEN xd
//get registred user data token
export const getUserLog = async (req: Request, res: Response) => {
    const id = req.userPayload.id;

    User.findById(id, {password: 0},(err: any, user: any) => {
        if(err) return res.status(500).send({mensaje: err})
        if(!user) return res.status(401).send({mensaje: 'User not found'});

        return res.status(200).send({user});
    });
};

//get user paginate
export const getUsersPag = async (req: Request, res: Response) => {
    const identity_user = req.userPayload.id;
    let page: number = 1;
    if(req.params.page){
        page = +req.params.page;
    }

    let itemPag: number = 3;

    const usersPag = await User.paginate({/*recibe un parametro para que busque segun una propiedad*/}, {sort: '_id', limit: itemPag, page: page});

    if(usersPag.error) return res.status(500).send({message: 'Query error'});
    if(!usersPag) return res.status(404).send({message: 'no user available'});

    res.json(usersPag);

}

//update user data
export const updateUserData = (req: Request, res: Response) => {
    const idPar = req.params.id;
    const updateData = req.body;
    console.log(idPar)
    console.log(updateData)

    //eliminar la propiedad password de los datos obtenidos del req.body
    delete updateData.password;

    if(idPar != req.userPayload.id){
        return res.status(500).send({message: 'you do not permission to update user'});
    }

    User.findByIdAndUpdate(idPar, updateData, {new: true}, (err: any, user: any) => {
        if(err) return res.status(500).send({message: [err.message, 'query error update']});
        if(!user) return res.status(404).send({message: 'user could not be updated'});

        return res.status(200).send({user: user});
    });
}

//upload image user
export const uploadImgUser = async (req: Request, res: Response) => {
    console.log('entre xd ==> ', req.file?.path)
    const idPar = req.params.id;    

    if(req.file){
        let file_path = req.file?.path;
        console.log(file_path)
        let file_split_path = file_path.split('\\');    
        console.log(file_split_path);
        let file_name = file_split_path[10];
        console.log('====> ', file_name);
        let file_name_split = file_name.split('.');
        console.log(file_name_split);
        let file_ext = file_name_split[1];
        console.log(file_ext);

        if(idPar != req.userPayload.id){
            console.log('entre a la validacion por que el usuario no es valido')
            return removeFile(res, file_path, 'yoy do not have persmission to upload img in user')
        }
        
        //comprobar tipo de archivo
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
            //update logger user document
            
            const imgUpdate = await User.findByIdAndUpdate(idPar, {imagen: file_name}); /* , (err: any, userUpdateImg) => {*/
                
                if(imgUpdate?.errors) return res.status(500).send({message: 'query error update'});
                
                if(!imgUpdate) return res.status(404).send({message: 'user could not be updated'});
                console.log(`== SE SALIO ALV ==`)
                return res.status(200).send({message: imgUpdate})
                
            
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

