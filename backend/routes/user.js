const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');

//compléter plus tard qd front + avancé 
router.post('/signup', checkInput, checkPassword, userCtrl.signup); // rajouter nocache() et express validator pour verif tailles et formats données
router.post('/login', checkInput, userCtrl.login); //rajouter nocache et brute force prevent
router.get('/users', userCtrl.getAllUsers);
router.get('/users/:id', userCtrl.getOneUser);
router.delete('/users/:id', userCtrl.deleteUser);//possible par user ou admin seulement ? à décider
router.put('/users/:id', userCtrl.modifyUser);


module.exports = router; 