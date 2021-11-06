import { Router } from'express';
const router = Router();

import { verificarToken } from '../middlewares/passport' 

import {
    testFriends,
    saveFriends,
    deleteFriends,
    paginateFriends,
    getFriends,
    getCountFriends
} from'../controller/friends.controller';

router.get('/testfriends', testFriends);
router.post('/newfriend', verificarToken, saveFriends);
router.delete('/deletefriend/:id', verificarToken, deleteFriends);
router.get('/getfriendsPag', verificarToken, paginateFriends);
router.get('/getfriend', verificarToken, getFriends);
router.get('/getcount/:id?', verificarToken, getCountFriends);


export default router;