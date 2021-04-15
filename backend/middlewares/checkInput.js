//middleware pour validation des entrées des utilisateurs :
// ne doit pas contenir de caractères dangereux, pour éviter unjection SQL ou JS ou CSS :

const pattern =  /[<>$=#{}()%]/

const isInvalid = (string) =>{
    return pattern.test(string);
};

module.exports = (req, res, next) =>{
    if(isInvalid(req.body.email) || isInvalid(req.body.password) || isInvalid(req.body.firstname) || isInvalid(req.body.lastname) || isInvalid(req.body.title) || isInvalid(req.body.description) || isInvalid(req.body.content) || isInvalid(req.body.commContent)){
        throw res.status(404).json({error:'Format de donées incorrectes, Caractères <>$=#{}()% non autorisés '});
    }else{ 
        next();
    }
};

