const express = require('express');
const multer = require('multer');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const articleCtrl = require('../controllers/article');

const checkInputArticle = require('../middlewares/checkInputArticle');
const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multerConfig = require('../middlewares/multer-config');


//essai (en enlevant multerConfig de la route) : enregister l'image sans modif de nom et sans extensiotn, et enregistre le message sans se rendre compte qu'il y un req.file...
/*
const upload = multer({
    dest: './images',
})*/

//////////////////////
 
///essai directement ici cf vidéo : meme problème MulterError : Unexpected Field..... 
const MIME_TYPE = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpg', 
    'image/JPG': 'jpg', 
    'image/png': 'png'
};


const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },
    filename: (req, file, callback) =>{
        const name = file.fieldname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
       //callback(null, new Date() + file.originalname);
    }
});
//décommenter aussi 'upload.single('image) ds la route


const upload = multer({  storage: storage })

router.post('', /*auth,*/ /*checkInputArticle,*/ /**/ /*multerConfig ,*/ upload.single('file')  , checkInputArticle, checkInput, articleCtrl.createArticle);

router.get('', /*auth,*/articleCtrl.getAllArticles);

router.get('/:id', /*auth,*/ articleCtrl.getOneArticle);

router.put('/:id', /*auth,*//**/ upload.single('file'), checkInputArticle, checkInput,/*, multerConfig,*/ articleCtrl.modifyArticle);

router.delete('/:id', /*auth,*/ articleCtrl.deleteArticle);


module.exports = router; 

// pb : pour input plutot echapper caractères dangereux car : et " peuvent etre necessaire ds le texte du message"


