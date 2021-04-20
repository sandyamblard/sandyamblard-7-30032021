const express = require('express');
const router = express.Router();

const  commentCtrl= require('../controllers/comment');

const auth = require('../middlewares/auth');
const checkInputComment = require('../middlewares/checkInputComment');
const checkInput = require('../middlewares/checkInput');
const authorOrAdmin = require('../middlewares/authorCommentOrAdmin');

router.post('/articles/:articleId/comment', auth, checkInputComment, checkInput, commentCtrl.createComment); 
router.get('/articles/comment/:id', auth, commentCtrl.getOneComment);
router.get('/articles/:articleId/comments',auth,  commentCtrl.getSeveralComments);
router.put('/articles/comment/:id', auth, checkInputComment, checkInput, authorOrAdmin,  commentCtrl.modifyComment); 
router.delete('/articles/comment/:id', auth, authorOrAdmin,  commentCtrl.deleteComment);



module.exports = router; 