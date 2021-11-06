import express from 'express';
const router = express.Router();

import { signUp, signIg, consulta} from '../controller/usuario.controller';

router.post('/signup', signUp);//ruta registrar un nuevo usuario
router.post('/signin', signIg);//ruta Logear un usuario
router.get('/consulta', consulta)

export default router;
