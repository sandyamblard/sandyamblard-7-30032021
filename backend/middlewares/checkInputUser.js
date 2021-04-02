//middleware pour validation des entrées des utilisateurs :
// pour envoyer erreurs si erreur de taille des entrées


module.exports = (req, res, next) =>{
    if (req.body.firstname == null || req.body.lastname == null ){
        return res.status(400).json({error:'Merci de bien remplir les champs obligatoires'})
    } else if ( req.body.firstname.length <2 || req.body.firstname.length >255 || req.body.lastname.length <2 || req.body.lastname.length >255 || req.body.description.length <2 || req.body.description.length >255){
        return res.status(400).json({error:'Nom, Prenom, Biographie : à remplir de 2 à 255 caractères'})
    } else{ 
        next();
    }
};


