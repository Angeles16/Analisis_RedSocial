import multer from 'multer';
import path from 'path';

const storageUser = multer.diskStorage({
    destination: path.join(__dirname, '../../../Frontend/src/assets/img/user'),
    filename: (req, file, cb) => {
        cb(null, (Date.now() +'-'+file.originalname));
    }
});

const uploadUser = multer({
    storage: storageUser,
}).single('avatar');

module.exports = uploadUser;