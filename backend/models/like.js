'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User,{ 
        foreignKey:'userId',
        as: 'user',     
      });
      
      // Relation entre les clés étrangères et la table de référence
      models.Like.belongsTo(models.Article,{
        foreignKey:'articleId',
        as: 'article',
        //essai pour pouvoir supprimer un article si il a des commentaires ou des likes
           // foreignKeyConstraint: true, onDelete: 'cascade'
      });
    };
  };
  Like.init({
    articleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Article',
        key: 'id', onDelete: 'CASCADE'
      }
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isLike: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};