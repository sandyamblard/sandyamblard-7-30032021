/*const sequelize = require('sequelize');
const { validationResult } = require('express-validator');*/
//const fs = require('fs');

const models = require('../models/index');

exports.createComment = (req, res, next) => {
    //pour l'instant userId est dans la requete, ensuite le prendre dans le token
    models.Comment.create({
        userId:req.body.userId, 
        articleId: req.params.articleId,
         commContent: req.body.commContent })
    .then( ()=>res.status(201).json({message : 'commentaire créé'}))
    .catch((error) => res.status(400).json({ error, message : "Le commentaire n'a pas pu être créé !" }))
};

//modification d'un commentaire :
exports.modifyComment = (req, res, next) =>{
    models.Comment.update({
        commContent: req.body.commContent}, 
        {where: {id: req.params.id}})
    .then (() => res.status(200).json("commentaire modifié !"))
    .catch(error => res.status(404).json({error, message: "Le commentaire n'a pas pu être modifié"}))
}; 

//get un commentaire à partir de son id
exports.getOneComment = (req, res, next) =>{
    models.Comment.findOne(/*
        {where: {id: req.params.id}}, 
        {include:[{model: models.User, as: 'user', required: true, attributes: ["firstname", "lastname"]}]}*/
        { attributes: ['id', 'userId', 'articleId', "commContent", "createdAt", "updatedAt"] , 
                            where: {id: req.params.id}, 
                            include:[{model: models.User, as: "user", required: true, attributes: ['id',"firstname", "lastname", 'imageUrl']},
                            {model: models.Article, as: "article", 
                            required: true,  
                            attributes: ["title", "url", "userId", 'id']}]}
        )
    .then (comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({error, message: "Le commentaire n'a pas pu être trouvé"}))
}; 

//get tous les commentaires d'un article :
exports.getSeveralComments = (req, res, next) =>{
    console.log(req.params.articleId)
    models.Comment.findAll({ attributes: ['id', 'userId', 'articleId', "commContent", "createdAt", "updatedAt"] , 
                            where: {articleId: req.params.articleId}, 
                            include:[{model: models.User, as: "user", 
                            required: true,  
                            attributes: ["firstname", "lastname", 'imageUrl', 'id']}]}
        /*{include:[{model: models.User, as: 'user', required: true, attributes: ["firstname", "lastname", "imageUrl"]}]},
         {where: {articleId: req.params.articleId}}*/
        )
    .then (comments => res.status(200).json(comments))
    .catch(error => res.status(404).json({error, message: "Les commentaires n'ont pas pu être trouvé"}))
}; 


//supprimer un commentaire à partir de son id
exports.deleteComment = (req, res, next) =>{
    models.Comment.destroy({where: {id: req.params.id}})
    .then (() => res.status(200).json({message: 'commentaire supprimé'}))
    .catch(error => res.status(404).json({error, message: "Le commentaire n'a pas pu être supprimé"}))
}; 
