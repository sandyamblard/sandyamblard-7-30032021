


module.exports = (req, res, next) =>{
    if (req.body.title == null || req.body.content == null ){
        return res.status(400).json({error:'Merci de bien remplir tous les champs'})
    } else if ( req.body.title <2 || req.body.title >255 ){
        return res.status(400).json({error:'titre trop  long ou trop court'})
    } else{ 
        next();
    }
};