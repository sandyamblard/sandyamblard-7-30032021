const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

const auth = require('../middlewares/auth');


router.post('/articles/:articleId/vote/like', auth, likeCtrl.addLike); 
router.post('/articles/:articleId/vote/cancellike', auth, likeCtrl.cancelLike); 
router.get('/articles/:articleId/likes', auth, likeCtrl.getLikes)


module.exports = router; 