//comprobar si el token es correco y validar secional
//estrategia para crear metodo de autenticacion para
import config from '../config/config';
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import User, {IUser} from'../models/usuario.models';

interface IPayload {
    id: string;
    nombre: string;
    apellido: string; 
    nick: string;
    email: string; 
    imagen: string; 
}


export const verificarToken = async(req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).json('Access Denied');
    }
    const payload = jwt.verify(token, config.jwtSecret) as IPayload;
    console.log('token', payload, 'ayuda');
    req.userPayload = payload;
    next();
    
}

