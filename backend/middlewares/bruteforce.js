/*const ExpressBrute = require('express-brute');

const Sequelize = require('sequelize');


const SequelizeStore = require('express-brute-sequelize-js'); //ou sans js mais mm fct ?? ou express-brute-store-sequelize
const sequelize = new Sequelize('test', 'root', 'root', {
    host: "127.0.0.1",
    password: "417271",
    dialect: "mysql",
    logging: false
  });

new SequelizeStore(sequelize, 'bruteStore', {}, function(store) {
    const bruteforce = new ExpressBrute(store);) ////pb fonction avec post dedans... comment noter dans un middleware ???

module.exports = bruteforce;
*/
//autre possibilité : stockage ds memory store ?