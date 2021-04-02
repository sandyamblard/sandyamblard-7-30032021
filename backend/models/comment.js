'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User,{ 
        foreignKey:'userId',
        as: 'user',
      });
      
      // Relation entre les clés étrangères et la table de référence
      models.Comment.belongsTo(models.Article,{
        foreignKey:'articleId',
        as: 'article'
        
      });
    };
  };
  Comment.init({
    articleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Article',
        key: 'id'
      }
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    commContent: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};