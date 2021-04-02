const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const articleCtrl = require('../controllers/article');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multer = require('../middlewares/multer-config');
const checkInputArticle = require('../middlewares/checkInputArticle');


router.post('', /*auth,*/ checkInputArticle, checkInput, multer, articleCtrl.createArticle);

router.get('', /*auth,*/articleCtrl.getAllArticles);

router.get('/:id', /*auth,*/ articleCtrl.getOneArticle);

router.put('/:id', /*auth,*/checkInput, checkInputArticle, multer, articleCtrl.modifyArticle);

router.delete('/:id', /*auth,*/ articleCtrl.deleteArticle);


module.exports = router; 

// pb : pour input plutot echapper caractères dangereux car : et " peuvent etre necessaire ds le texte du message"


