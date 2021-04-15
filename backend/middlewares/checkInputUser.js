//middleware pour validation des entrées des utilisateurs :
// pour envoyer erreurs si erreur de taille des entrées



//le formData transforme null en "null" (string) : commencer par re-transformer 'null' en null pour date qui n'est pas obligatoires
module.exports = (req, res, next) =>{
    if(req.body.birthdate =='null'){
        req.body.birthdate = null;
    }
    if (req.body.firstname == "null" || req.body.lastname == "null" ){
        throw res.status(400).json({error:'Merci de bien remplir les champs obligatoires'})
    } else if ( req.body.firstname.length <2 || req.body.firstname.length >255 || req.body.lastname.length <2 || req.body.lastname.length >255 || req.body.description.length >255){
        throw res.status(400).json({error:'Nom, Prenom, Biographie : à remplir de 2 à 255 caractères'})
    } else{ 
        next();
    }
};


