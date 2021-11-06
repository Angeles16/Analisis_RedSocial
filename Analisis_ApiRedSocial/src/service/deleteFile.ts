import fs from 'fs';
import path from 'path';
import {Response} from 'express';

const removeFile = (res: Response, filePath: any, message: any) => {
    fs.unlink(filePath, (err) => {
        return res.status(200).send({ message: message});
    })
}

module.exports = removeFile;