/*require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require("crypto-js");*/
/*const sequelize = require('sequelize');
const { validationResult } = require('express-validator');*/
const fs = require('fs');

const models = require('../models/index');


///création article : voir comment arrive l'userId (via front end ou récup via token ?) 
exports.createArticle = (req, res, next) => {
    if(req.file){   
           models.Article.create({
            UserId:req.body.userId, 
            title: req.body.title, 
            content: req.body.content, 
            likes:0, 
            url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
        .then( (article)=>res.status(201).json({message : 'article créé'}))
        .catch((error) => res.status(500).json({ error, message : "L'article n'a pas pu être créé !" }))    
    }else{
        console.log('title', req.body.title)
            models.Article.create({
                UserId:req.body.userId, 
                title: req.body.title, 
                content: req.body.content, 
                likes:0,
                url: null})
            .then( (article)=>res.status(201).json({message : 'article sans photo créé'}))
            .catch((error) => res.status(500).json({ error, message : "L'article sans photo n'a pas pu être créé !" }))
    }
       
};

 
//get all articles :
exports.getAllArticles = (req, res, next) => {
    models.Article.findAll({include:[{model: models.User, required: true, attributes: ["firstname", "lastname", "id", "imageUrl"]}], order:[['id', 'DESC']]})
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
    if(req.file){
        //si image présente dans la requête, on recherche si il y en avait déjà une présente dans l'article :
        models.Article.findOne({where: {id: req.params.id}}) 
        .then(articleFound=>{
            if(articleFound.url){ //si image déjà dans l'article :
                const filename = articleFound.url.split('/images')[1];
                fs.unlink(`images/${filename}`, () =>{ //suppression image déjà présente
                    //update avec nouvelle image nouvelle image : 
                    models.Article.update( { title: req.body.title, content: req.body.content , url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}, {where: {id: req.params.id}})
                    .then (() => res.status(200).json('article avec photo modifié avec nouvelle photo'))
                    .catch(error => res.status(500).json({error, message: "erreur modif article avec photo et nouvelle photo"})) })
                }else{ //si article n'avait pas d'image : 
                    models.Article.update( { title: req.body.title, content: req.body.content , url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}, {where: {id: req.params.id}})
                    .then (() => res.status(200).json('article sans photo modifié, photo ajoutée'))
                    .catch(error => res.status(500).json({error, message: "erreur update article qui n'avait pas de photo"}))
                }
            })      
        .catch(err => res.status(404).json({error, message: 'erreur lors récup article pour vérifier sa photo'}))
    }else{ //si pas d'image dans la requete de modif : 
        models.Article.update({...req.body}, {where: {id: req.params.id}})
        .then (article => res.status(200).json("article modifié !"))
        .catch(error => res.status(404).json({error, message: "L'article n'a pas pu être modifié"})) 
    }
}; 


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

