const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multer = require('../middlewares/multer-config');
const checkInputUser = require('../middlewares/checkInputUser');

const { body, validationResult } = require('express-validator');

//compléter plus tard qd front + avancé 
router.post('/signup', /*auth, */ checkInputUser, checkInput, checkPassword, userCtrl.signup); 
    // rajouter nocache() et express validator pour verif tailles et formats données

router.post('/login', /*auth, */checkInput, userCtrl.login); //rajouter nocache et brute force prevent

router.get('/users', /*auth, */userCtrl.getAllUsers);

router.get('/users/:id', /*auth, */userCtrl.getOneUser);

router.delete('/users/:id', /*auth, */userCtrl.deleteUser);//possible par user ou admin seulement ? à décider

router.put('/users/:id', /*auth, */ checkInputUser, checkInput, multer, userCtrl.modifyUser);

router.put('/users/:id/pass', /*auth, */ /*checkInputUser,*/ checkInput, multer, userCtrl.modifyMailPassword);


module.exports = router;  