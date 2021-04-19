const express = require('express');
const router = express.Router();
const multer = require('multer');
const nocache = require('nocache');

const userCtrl = require('../controllers/user');

const auth = require('../middlewares/auth');
const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const checkInputUser = require('../middlewares/checkInputUser');
const upload = require('../middlewares/multer-config');
const bruteforce= require ('../middlewares/bruteforce')

//Définition des routes users et middlewares associés
router.post('/signup', nocache(), upload.single('file'), checkInputUser, checkInput, checkPassword, userCtrl.signup); 

router.post('/login' , nocache(), checkInput, bruteforce.prevent , userCtrl.login); //rajouter nocache et brute force prevent

router.get('/users', auth, userCtrl.getAllUsers);

router.get('/users/:id', auth, userCtrl.getOneUser);

router.delete('/users/:id', auth, userCtrl.deleteUser);

router.put('/users/:id', auth,  upload.single('file'), checkInputUser, checkInput, userCtrl.modifyUser);

router.put('/users/:id/pass', auth,  checkInput, userCtrl.modifyMailPassword);


module.exports = router;  