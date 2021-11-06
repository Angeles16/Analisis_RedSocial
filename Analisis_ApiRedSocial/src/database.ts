import mongoose, { ConnectOptions } from 'mongoose';
import config from './config/config';


//parametros para la coneccion a mongose 
mongoose.connect(config.DB.URI);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log(`mongo connection stablished`);
})

connection.on('error', err => {
    console.log(err);
    process.exit(0);
})