/*require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require("crypto-js");*/
const sequelize = require('sequelize');
const { validationResult } = require('express-validator');
const fs = require('fs');

const models = require('../models/index');


///création article : voir comment arrive l'userId (via front end ou récup via token ?) 
exports.createArticle = (req, res, next) => {
    //gestion des erreurs d'express validator (cf router)
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
    models.Article.create({UserId:req.body.userId, title: req.body.title, content: req.body.content, url: req.body.url, likes:0 })
        .then( (article)=>res.status(201).json({message : 'article créé'}))
        .catch((error) => res.status(400).json({ error, message : "L'article n'a pas pu être créé !" }))
};

//get all articles :
exports.getAllArticles = (req, res, next) => {
    models.Article.findAll()
    .then (articles => res.status(200).json(articles))
    .catch(error => res.status(404).json({error, message: "Erreur lors de la récupération des articles"}))
};

//get one article : 
exports.getOneArticle = (req, res, next) => {
    models.Article.findOne({where: {id: req.params.id}})
    .then (article => res.status(200).json(article))
    .catch(error => res.status(404).json({error, message: "Erreur lors de la récupération de l'article"}))
};

//update one article :
exports.modifyArticle = (req, res, next) =>{
    //gestion des erreurs d'express validator (cf router)
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
    models.Article.update({...req.body}, {where: {id: req.params.id}})
    .then (user => res.status(200).json("article modifié !"))
    .catch(error => res.status(404).json({error, message: "L'article n'a pas pu être modifié"}))
}; //rajouer condition req.file quand possibilité d'envoyer fichier via front (avec multer)


//supprimer un article (réservé a l'admin et au user concerné : ajouter condition)
exports.deleteArticle = (req, res, next) => {
    models.Article.destroy({where: {id: req.params.id}})
    .then (user => res.status(200).json('article supprimé'))
    .catch(error => res.status(404).json({error, message : "erreur supprim article"}))
};   