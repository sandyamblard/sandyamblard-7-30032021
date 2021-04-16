const express = require('express');
const router = express.Router();
const multer = require('multer');
const nocache = require('nocache');

const userCtrl = require('../controllers/user');

const auth = require('../middlewares/auth');
const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const checkInputUser = require('../middlewares/checkInputUser');

//const { body, validationResult } = require('express-validator');

//Configuration de multer :
const MIME_TYPE = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpg', 
    'image/JPG': 'jpg', 
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },
    filename: (req, file, callback) =>{
        const name = file.fieldname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const upload = multer({  storage: storage })


//Définition des routes users et middlewares associés
router.post('/signup', nocache(), upload.single('file'), checkInputUser, checkInput, checkPassword, userCtrl.signup); 

router.post('/login' , nocache(), checkInput, userCtrl.login); //rajouter nocache et brute force prevent

router.get('/users', auth, userCtrl.getAllUsers);

router.get('/users/:id', auth, userCtrl.getOneUser);

router.delete('/users/:id', auth, userCtrl.deleteUser);

router.put('/users/:id', auth,  upload.single('file'), checkInputUser, checkInput, userCtrl.modifyUser);

router.put('/users/:id/pass', auth,  checkInput, userCtrl.modifyMailPassword);


module.exports = router;  