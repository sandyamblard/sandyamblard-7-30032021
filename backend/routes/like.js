const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multer = require('../middlewares/multer-config');

const { body, validationResult } = require('express-validator');

router.post('/articles/:articleId/vote/like', /*auth, */likeCtrl.addLike); 
//router.post('/articles/:messageId/vote', /*auth, */likeCtrl.addDisike); 


module.exports = router; 