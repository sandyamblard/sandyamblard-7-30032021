const models = require('../models/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next)=>{
    //obtention de l'userId via le token :
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_KEY_FOR_TOKEN);
    const sentUserId = decodedToken.userId;
    models.Article.findOne({where: {id: req.params.id} })
    //on récupère l'article concerné pour vérifier son auteur
    .then(articleFound =>{
        if(sentUserId == articleFound.userId){
            next()
            // si userId de la requete est l'auteur c'ets ok on continue la requête
        }else{
            //sinon vérifier si c'est l'admin qui fait la requête
            models.User.findOne({where:{id: sentUserId}})
            .then(userFound =>{
                if(userFound.isAdmin){
                    next()
                }else{ return res.status(401).json({error: "Vous n'avez pas le droit de modifier ce message"})}
            })
            .catch(err => res.status(500).json({error, message:'erreur lors récup user'}))
        }
    } )
    .catch(err => res.status(500).json({error, message:'erreur lors récup message'}))
    
};