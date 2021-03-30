const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.DB_KEY_FOR_TOKEN);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'Utilisateur Id non valable';
        }else{
            next();
        }
    } catch (error){
        res.status(401).json({error: error | 'requete non authentifiée'})
    }
};

//vérifie l'authentification de l'utilisateur en vérifiant son identifiant (présent dans le token)