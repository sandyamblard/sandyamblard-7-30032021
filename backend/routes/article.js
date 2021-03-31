const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');

router.post('', articleCtrl.readArticle);
router.get('', articleCtrl.getAllArticles);
router.get('/:id', articleCtrl.getOneArticle);
router.put('/:id', articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);


module.exports = router; 


/*
{
    "userId":"7",
"title": "Deuxième post ! ",
"content": " ça marche ?!",
"url": "http://localhost/images/logoCDP.jpg",
"createdAt": "2021-03-30T17:38:45.000Z",
        "updatedAt": "2021-03-31T07:46:49.000Z",
}*/