const express = require('express');
const router = express.Router();

const  commentCtrl= require('../controllers/comment');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multer = require('../middlewares/multer-config');

const { body, validationResult } = require('express-validator');

router.post('/articles/:articleId/comment', /*auth, */commentCtrl.createComment); //ajouter check Input ?
router.get('/articles/comment/:id', commentCtrl.getOneComment);
router.get('/articles/:articleId/comments', commentCtrl.getSeveralComments);
router.put('/articles/comment/:id', /*auth, */commentCtrl.modifyComment); //ajouter check Input ?
router.delete('/articles/:articleId/comment/:id', commentCtrl.deleteComment);



module.exports = router; 