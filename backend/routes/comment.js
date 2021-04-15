const express = require('express');
const router = express.Router();

const  commentCtrl= require('../controllers/comment');

const checkInputArticle = require('../middlewares/checkInputArticle');
const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multer = require('../middlewares/multer-config');

const { body, validationResult } = require('express-validator');

router.post('/articles/:articleId/comment', /*auth, *//*checkInputArticle,*/ checkInput,  commentCtrl.createComment); //ajouter check Input ?
router.get('/articles/comment/:id', commentCtrl.getOneComment);
router.get('/articles/:articleId/comments', commentCtrl.getSeveralComments);
router.put('/articles/comment/:id', /*auth, */checkInput, commentCtrl.modifyComment); //ajouter check Input ?
router.delete('/articles/comment/:id', commentCtrl.deleteComment);



module.exports = router; 