import User, {IUser} from '../models/usuario.models';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import moment from 'moment';


export function createToken(user: IUser){
    const payload = {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        nick: user.nick,
        email: user.email,
        imagen: user.imagen,
        iat: moment().unix(),//Fecha de creacion del token 
        exp: moment().add(30, 'days').unix() //Fecha de expiracion del token
    };
    return jwt.sign(payload, config.jwtSecret);
}    