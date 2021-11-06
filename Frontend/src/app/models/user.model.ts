export interface User {
    _id?: string;
    nombre: string;
    apellido: string; 
    nick: string;
    fecha_nacimiento: string;
    pais: string;
    email: string; 
    password: string; 
    roles?: string; 
    imagen?: string;
    createdAt?: string;
    updateAt?: string; 
}

export interface loginUser {
    email: string;
    password: string; 
}

export interface token{
    token?: string;
}
    
export interface updateUser {
    _id?: string;
    nombre: string;
    apellido: string; 
    nick: string;
    fecha_nacimiento?: string;
    pais: string;
    email?: string; 
    password?: string; 
    roles?: string; 
    imagen?: string;
    createdAt?: string;
    updateAt?: string; 
}

export interface Vista {
    nombre: string;
    apellido: string; 
    nick: string;
    fecha_nacimiento?: string;
    pais: string;
}