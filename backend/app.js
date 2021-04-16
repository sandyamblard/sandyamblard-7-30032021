const Sequelize = require('sequelize');
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const session = require('cookie-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');
//const mysql = require('mysql2');


const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment'); 


//connection à la base de données et test
const sequelize = new Sequelize('mysql://' + process.env.DB_INFOS_SQL);

(async function() {
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }})();

  //ne crée pas de table si existe déjà et note les requetes effectuées en console
  sequelize.sync({logging: console.log});


//configuration du CORS pour autoriser requetes exterieures : 
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //autorise n'importe quelle origine
    //définition des en-tetes qui seront utilisées
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//définit les méthodes autorisées
    next();
  });


//paramètre les cookies en http-only (sécurise la connection)
 app.use(session({
  secret:"s4Fe1y",
  cookie:{
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
  }
})); 



app.use(bodyParser.json());  //transforme corps des requetes en objet js utilisable

app.use(helmet()); // sécurisation de l'application grâce au pulg-in helmet

//on fait en sorte de pouvoir accéder au dossier images en rendant le dossier images statique :
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/articles', articleRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/', likeRoutes);
app.use('/api/', commentRoutes);

module.exports = app; 