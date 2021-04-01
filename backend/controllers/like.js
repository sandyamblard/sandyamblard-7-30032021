const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const { body, validationResult } = require('express-validator');

const models = require('../models/index');
const User = require('../models/User');



exports.addLike = (req, res, next) =>{
    //recup userId via le tokken à rajouter plus tard (pour l'instant mettre userId ds la requete)

    //vérif si existe déjà un like pour cet article et ce user: 
    models.Like.findOne({where: {userId:req.body.userId, articleId: req.params.articleId}})
        .then( (result)=> {const Likefound = result;
            if(Likefound === null){ //si il n'existe par de like pour cet user et cert article on passe à la suite :
                models.Like.create({ //on crée un like ds table like
                    userId: req.body.userId,
                    articleId: req.params.articleId,
                    isLike:1
                }).then( (likeCreated)=>{console.log(likeCreated);
                    //on incrémente le compteur de likes de l'article concerné et on l'update
                    models.Article.findOne({where: {id: likeCreated.articleId}}) 
                        .then( (articlefound) => {console.log(articlefound); 
                            const countLikes = articlefound.likes + 1;               
                            models.Article.update({likes: countLikes}, {where: {id: articlefound.id}})
                                .then (user => res.status(200).json({message: 'like enregistré et article modifié'}))
                                .catch(error => res.status(404).json({error, message : "erreur modification article"}))
                        })
                        .catch (err => res.status(404).json({error, message : "article non retrouvé"}))
                    
                    })

                .catch(error => res.status(500).json({ error, message: "erreur lors de l'enregistrement du like" }))
            } else{ //si user aimait déjà cet article
                res.status(409).json({ message: "Like déjà compatibilisé auparavant" })
            }
        })
        .catch (()=> console.log('pas trouvé'));
};

// recup des likes d'un article :
exports.getLikes = (req, res, next)=>{ 
   models.Like.findAll({ attributes: [/*'id', 'userId', 'articleId'*/] , where: {articleId: req.params.articleId}, include:[{model: models.User, as: "user", required: true,  attributes: ["firstname", "lastname"]}]})
    .then( listLikes => res.status(200).json(listLikes))
    .catch (error => res.status(500).json({ error, message: "erreur lors d la recup des likes" }))
};