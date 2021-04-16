
module.exports = (req, res, next) =>{

    if (req.body.commContent == null){
        return res.status(400).json({error:'Merci de bien remplir tous les champs'})
    } else if ( req.body.commContent.length <2 || req.body.commContent.length >255){
        return res.status(400).json({error:'Le commentaire doit comporter enter 2 et 255 caractères'})
    } else{ 
        next();
    }
};