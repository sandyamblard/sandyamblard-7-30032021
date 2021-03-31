const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const articleCtrl = require('../controllers/article');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multer = require('../middlewares/multer-config');


router.post('', 
    body('title').isLength({ min: 2, max: 255}).withMessage('Le titre doit avoir entre 2 et 255 caractères. '),
    body('content').isLength({ min: 2}).withMessage('Votre article doit avoir au moins 2 caractères. '),
    /*checkInput,*/ multer, articleCtrl.createArticle);

router.get('', articleCtrl.getAllArticles);

router.get('/:id', articleCtrl.getOneArticle);

router.put('/:id', 
    body('title').isLength({ min: 2, max: 255}).withMessage('Le titre doit avoir entre 2 et 255 caractères. '),
    body('content').isLength({ min: 2}).withMessage('Votre article doit avoir au moins 2 caractères. '),
    /*checkInput, */multer, articleCtrl.modifyArticle);

router.delete('/:id', articleCtrl.deleteArticle);


module.exports = router; 

// pb : pour input plutot echapper caractères dangereux car : et " peuvent etre necessaire ds le texte du message"


