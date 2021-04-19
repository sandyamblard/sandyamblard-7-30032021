const ExpressBrute = require('express-brute');

//store local pour dev :
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);


module.exports = bruteforce;
