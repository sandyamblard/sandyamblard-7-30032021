const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://' + process.env.DB_INFOS_SQL);

/*
 * USER
 */
const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    firstname: {type: Sequelize.STRING(255), allowNull: false, },
    lastname: {type: Sequelize.STRING(255), allowNull: false, },
    email: {type: Sequelize.STRING(255), allowNull: false, unique: true},
    birthdate: {type: Sequelize.DATE, allowNull: true, },
    imageUrl: {type: Sequelize.STRING(255), allowNull: true, },
    description: {type: Sequelize.STRING(255), allowNull: true, },
    isAdmin: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue:false,}
},
        {timestamps: false, underscored: true}
);
exports.User = User;

/*
 * ARTICLE
 */
const Article = sequelize.define('article', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    userId: {type: Sequelize.INTEGER, allowNull: false, },
    title: {type: Sequelize.STRING(255), allowNull: false, },
    content: {type: Sequelize.TEXT, allowNull: false,},
    //date: {type: Sequelize.DATE, allowNull: false, },
    imageUrl: {type: Sequelize.STRING(255), allowNull: true, },
    likes: {type: Sequelize.INTEGER, allowNull: true, defaultValue: 0, },
    usersLiked: {type: Sequelize.STRING, allowNull: true, defaultValue:"",}
},
        {timestamps: true, underscored: true}
);
exports.Article = Article;

Article.belongsTo(User);

sequelize.sync({logging: console.log});

//on exporte pour utiliser notre connexion depuis les autre fichiers.

module.exports = sequelize;