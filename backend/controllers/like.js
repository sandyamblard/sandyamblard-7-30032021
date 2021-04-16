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
                }).then( (likeCreated)=>{
                    //on incrémente le compteur de likes de l'article concerné et on l'update
                    models.Article.findOne({where: {id: likeCreated.articleId}}) 
                        .then( (articlefound) => { 
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
        .catch(error => res.status(500).json({error, message : "erreur récup like ds bdd"}));
};


exports.cancelLike = (req, res, next) =>{
    //annule le like si déjà existant, sinon erreur
    //1- pour le moment userId donné dans la requete, plus tard récup via le token
    
    //2- Vérif si existe déjà un like pour cet article et ce user
    models.Like.findOne({where: {userId:req.body.userId, articleId: req.params.articleId}})
        .then (likefound => { 
            if(likefound === null) {
                res.status(404).json({error : "like inexistant, impossible d'annuler le like"})
            }else{ //3- si like existe déjà on modifie le compteur de l'article :
                console.log('like retrouvé ds bdd likes')
                const likefoundId = likefound.id;
                models.Article.findOne({where: {id: likefound.articleId }})
                    .then( articlefound => { recupArticleId = articlefound.id;
                        console.log('article retrouvé ds bdd')
                        models.Article.update({likes: articlefound.likes-1}, {where: {id: articlefound.id}}) //ok fonctionne bien mais renvoie erreur ???
                        .then( () => { 
                            console.log('article modifié')
                            models.Like.destroy({where: {id: likefoundId}})
                            .then(()=> {
                                console.log('like supprimé'), 
                                res.status(200).json({message: "like annulé et compteur mis à jour"})
                            }) 
                            .catch (error => res.status(500).json({error, message: "erreur lors destruction like"}))
                        })   
                        //.catch (error => res.status(500).json({error, message: 'pb pour enregistrer dislike'})) 
                    })
                    //.catch ( res.status(500).json({error, message : 'erreur lors de la recuperation article'}) ) 
            }
        })
        .catch (error => res.status(500).json({error, message : "erreur récup like ds bdd"}));

};





// recup des likes d'un article (juste les noms des users):
exports.getLikes = (req, res, next)=>{ 
   models.Like.findAll({ attributes: [/*'id', 'userId', 'articleId'*/] , 
                         where: {articleId: req.params.articleId}, 
                         include:[{model: models.User, as: "user", 
                         required: true,  
                         attributes: ["id","firstname", "lastname", 'imageUrl']}]})
    .then( listLikes => res.status(200).json(listLikes))
    .catch (error => res.status(500).json({ error, message: "erreur lors d la recup des likes" }))
};