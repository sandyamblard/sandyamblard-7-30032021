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
    if(!req.body.file){
        models.Article.create({
        UserId:req.body.userId, 
        title: req.body.title, 
        content: req.body.content, 
        url: null, 
        likes:0 })
    .then( (article)=>res.status(201).json({message : 'article créé'}))
    .catch((error) => res.status(500).json({ error, message : "L'article n'a pas pu être créé !" }))
    } else{
        console.log('file présent');
        console.log('req.body.file :', req.body.file);
       /* models.Article.create({
            UserId:req.body.userId, 
            title: req.body.title, 
            content: req.body.content, 
            url: `${req.protocol}://${req.get('host')}/images/${req.body.file.filename}`, 
            likes:0 })
            .then( (article)=>res.status(201).json({message : 'article avec photo créé'}))
            .catch((error) => res.status(500).json({ error, message : "L'article avec photo n'a pas pu être créé !" }))        */
    }
       
};
 
//get all articles :
exports.getAllArticles = (req, res, next) => {
    models.Article.findAll({include:[{model: models.User, required: true, attributes: ["firstname", "lastname", "id", "imageUrl"]}]})
    .then (articles => res.status(200).json(articles))
    .catch(error => res.status(404).json({error, message: "Erreur lors de la récupération des articles"}))
};

//get one article : 
exports.getOneArticle = (req, res, next) => {
    models.Article.findOne(
        { where: {id: req.params.id}
        , include:[{model: models.User, required: true, attributes: ["id", "firstname", "lastname", "imageUrl"]}, {model: models.Comment}]})
    .then (article => res.status(200).json(article))
    .catch(error => res.status(404).json({error, message: "Erreur lors de la récupération de l'article"}))
}; 

//update one article :
exports.modifyArticle = (req, res, next) =>{
    models.Article.update({...req.body}, {where: {id: req.params.id}})
    .then (user => res.status(200).json("article modifié !"))
    .catch(error => res.status(404).json({error, message: "L'article n'a pas pu être modifié"}))
}; //rajouer condition req.file quand possibilité d'envoyer fichier via front (avec multer)


//supprimer un article (réservé a l'admin et au user concerné : ajouter condition)
exports.deleteArticle = (req, res, next) => {
    models.Article.findOne({where: {id: req.params.id}})
    .then (article => {
        if(article.url){ //si image associée :
            const filename = article.url.split('/images')[1];
            fs.unlink(`images/${filename}`, () =>{
            models.Article.destroy({where: {id: req.params.id}})
            .then (user => res.status(200).json('article supprimé'))
            .catch(error => res.status(500).json({error, message: "erreur supprission article"}))
        });
        }else{
                //si pas d'image associée :
                models.Article.destroy({where: {id: req.params.id}})
                .then (user => res.status(200).json('article supprimé'))
                .catch(error => res.status(500).json({error, message: "erreur supprission article"}))    
        }
        
    })
    .catch(error => res.status(404).json({error, message: "erreur récup article"}))
};   
//ajouter gestion du fichier 
