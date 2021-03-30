require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require("crypto-js");
const sequelize = require('sequelize');
const { validationResult } = require('express-validator');
const fs = require('fs');

/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://' + process.env.DB_INFOS_SQL);
*/
const models = require('../models/index');

//const User = require('../models/user');

 ///CREATION D'UN UTILISATEUR :
exports.signup = (req, res, next) => {
    //gestion des erreurs : pas besoin a priori ?????????????????? utile si express validator
  /*  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }*/
    const cryptedMail = cryptojs.HmacSHA512(req.body.email, process.env.DB_KEY_FOR_MAIL).toString(); //cryptage du mail avant stockage ds BDD
    bcrypt.hash(req.body.password, 10) // hashage du mot de passage avec salage avec stockage ds BDD
        .then(hash => {
             models.User.create({
                email: cryptedMail,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthdate: req.body.birthdate,
                description: req.body.description
            }).then( ()=>res.status(201).json({message : 'utilisateur créé'}))
              .catch(error => res.status(400).json({ error, message: 'erreur lors de la creation du compte' }))
        })
       .catch(error => res.status(500).json({ error, message : "erreur lors de la création du compte" }));
};

///SE CONNECTER :
exports.login = (req, res, next) => {
    const cryptedMail = cryptojs.HmacSHA512(req.body.email, process.env.DB_KEY_FOR_MAIL).toString();//cryptage du mail pour comparaison avec mail stocké ds BDD
    models.User.findOne({where: {email: cryptedMail}})
       .then(userfound => {
           if(userfound){ //si un utilisateur est trouvé : passer à vérif password
               console.log(userfound.password)
                bcrypt.compare(req.body.password, userfound.password, function(err,result){
                    if(result === false){ //si password pas bon : 
                        return res.status(400).json({error: "password invalide"})
                    }else { //si password ok : création du token
                        res.status(200).json({
                            userId: userfound.id,
                            token: jwt.sign(
                                { userId: userfound.id },
                                process.env.DB_KEY_FOR_TOKEN,
                                {expiresIn: '24h'}
                            )
                        });
                    }
                })  
                 
           }else{ //si utilisateur non trouvé
               return res.status(404).json({error: 'utilisateur inexistant'})
           }
       }).catch(err => {return res.status(500).json({error: 'erreur serveur pour verif user'})})
    
};
    
exports.deleteUser = (req, res, next) => {
    models.User.destroy({where: {id: req.params.id}})
    .then (user => res.status(200).json('utilisateur supprimé'))
    .catch(error => res.status(404).json({error: "erreur supprim user"}))
};    

//get all profils :
exports.getAllUsers = (req, res, next) => {
    models.User.findAll()
    .then (users => res.status(200).json(users))
    .catch(error => res.status(404).json({error: "erreur récup users"}))
};

    

//get one profil : 
exports.getOneUser = (req, res, next) => {
    models.User.findOne({where: {id: req.params.id}})
    .then (user => res.status(200).json(user))
    .catch(error => res.status(404).json({error: "erreur récup user"}))
};

//update profil :
exports.modifyUser = (req, res, next) =>{
    models.User.update({...req.body}, {where: {id: req.params.id}})
    .then (user => res.status(200).json("modification effectuée"))
    .catch(error => res.status(404).json({error: "erreur update user"}))
}; //rajouer condition req.file quand possibilité d'envoyer fichier via front (avec multer)

//edit password :
 