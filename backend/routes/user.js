const express = require('express');
const router = express.Router();
const multer = require('multer');

const userCtrl = require('../controllers/user');

const checkInput = require('../middlewares/checkInput');
const checkPassword = require('../middlewares/checkPassword');
const multerConfig = require('../middlewares/multer-config');
const checkInputUser = require('../middlewares/checkInputUser');

const { body, validationResult } = require('express-validator');


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


//compléter plus tard qd front + avancé 
router.post('/signup', /*auth, */  upload.single('file'), checkInputUser, checkInput, checkPassword, userCtrl.signup); 
    // rajouter nocache() et express validator pour verif tailles et formats données

router.post('/login', /*auth, */checkInput, userCtrl.login); //rajouter nocache et brute force prevent

router.get('/users', /*auth, */userCtrl.getAllUsers);

router.get('/users/:id', /*auth, */userCtrl.getOneUser);

router.delete('/users/:id', /*auth, */userCtrl.deleteUser);//possible par user ou admin seulement ? à décider

router.put('/users/:id', /*auth, */ upload.single('file'), checkInputUser, checkInput/*, multerConfig*/, userCtrl.modifyUser);

router.put('/users/:id/pass', /*auth, */ /*checkInputUser,*/ checkInput, userCtrl.modifyMailPassword);


module.exports = router;  