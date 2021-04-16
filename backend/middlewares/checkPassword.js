//création d'un schema de password fort

const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits();


module.exports = (req, res, next) =>{
    if(!passwordSchema.validate(req.body.password)){
        return res.status(400).json({ error : 'Mot de passe pas assez fort. Il faut minimum 8 caractères dont majuscule(s),minuscule(s), chiffres'});
    } else {
        next();
    }
}