const express = require('express');
const multer = require('multer');
const router = express.Router();

//const { body, validationResult } = require('express-validator');

const articleCtrl = require('../controllers/article');

const auth = require('../middlewares/auth');
const checkInputArticle = require('../middlewares/checkInputArticle');
const checkInput = require('../middlewares/checkInput');
//const multerConfig = require('../middlewares/multer-config');

 
///Config de multer :
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
    }
});

const upload = multer({  storage: storage });


/// Définition des routes liées aux articles associées à leurs middlewares : 

router.post('', auth, upload.single('file')  , checkInputArticle, checkInput, articleCtrl.createArticle);

router.get('', auth,articleCtrl.getAllArticles);

router.get('/:id', auth, articleCtrl.getOneArticle);

router.put('/:id', auth, upload.single('file'), checkInputArticle, checkInput, articleCtrl.modifyArticle);

router.delete('/:id', auth, articleCtrl.deleteArticle);


module.exports = router; 




