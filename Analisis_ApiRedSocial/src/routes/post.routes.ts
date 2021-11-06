import { Router } from 'express';

const router = Router();

import { verificarToken } from '../middlewares/passport' ;
const uploadUser = require('../middlewares/multer');

import {
    pruebaPost,
    savePost,
    getPublication, 
    getPublicationId,
    deletePublication, 
    uploadImgPost
} from '../controller/post.controller';

router.get('/', pruebaPost);
router.post('/newpost', [verificarToken, uploadUser], savePost);
router.get('/getpublication', verificarToken, getPublication);
router.get('/getpublicationid', verificarToken, getPublicationId);
router.delete('/deletepost/:id', verificarToken, deletePublication)
router.post('/uploadpostimg/:id', [verificarToken, uploadUser], uploadImgPost);

export default router;