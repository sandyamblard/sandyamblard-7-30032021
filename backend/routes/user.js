const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multer = require('../middlewares/multer-config');

const { body, validationResult } = require('express-validator');

//compléter plus tard qd front + avancé 
router.post('/signup', /*auth, */ 
    body('email').isEmail().withMessage('Votre adresse email doit avoir la forme : login@domaine.org'),
    body('firstname').isLength({ min: 2, max: 30}).withMessage('Votre prénom doit avoir entre 2et 30 caractères. '),
    body('lastname').isLength({ min: 2, max: 40}).withMessage('Votre nom doit avoir entre 2et 40 caractères. '),
    body('description').isLength({ min: 2, max: 255}).withMessage('Votre description doit avoir entre 2et 255 caractères. '),
checkInput, checkPassword, userCtrl.signup); // rajouter nocache() et express validator pour verif tailles et formats données

router.post('/login', /*auth, */checkInput, userCtrl.login); //rajouter nocache et brute force prevent

router.get('/users', /*auth, */userCtrl.getAllUsers);

router.get('/users/:id', /*auth, */userCtrl.getOneUser);

router.delete('/users/:id', /*auth, */userCtrl.deleteUser);//possible par user ou admin seulement ? à décider

router.put('/users/:id', /*auth, */
    /*body('email').isEmail().withMessage('Votre adresse email doit avoir la forme : login@domaine.org'),
    body('firstname').isLength({ min: 2, max: 30}).withMessage('Votre prénom doit avoir entre 2et 30 caractères. '),
    body('lastname').isLength({ min: 2, max: 40}).withMessage('Votre nom doit avoir entre 2et 40 caractères. '),
    body('description').isLength({ min: 2, max: 255}).withMessage('Votre description doit avoir entre 2et 255 caractères. '),*/
checkInput, multer, userCtrl.modifyUser);


module.exports = router; 