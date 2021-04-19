const express = require('express');
const multer = require('multer');
const router = express.Router();

const articleCtrl = require('../controllers/article');

const auth = require('../middlewares/auth');
const checkInputArticle = require('../middlewares/checkInputArticle');
const checkInput = require('../middlewares/checkInput');
const upload = require('../middlewares/multer-config');



/// Définition des routes liées aux articles associées à leurs middlewares : 

router.post('', auth, upload.single('file')  , checkInputArticle, checkInput, articleCtrl.createArticle);

router.get('', auth,articleCtrl.getAllArticles);

router.get('/:id', auth, articleCtrl.getOneArticle);

router.put('/:id', auth, upload.single('file'), checkInputArticle, checkInput, articleCtrl.modifyArticle);

router.delete('/:id', auth, articleCtrl.deleteArticle);


module.exports = router; 




