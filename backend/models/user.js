'use strict';
const {
  Model
} = require('sequelize');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://' + process.env.DB_INFOS_SQL);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Article, { onDelete: 'CASCADE', hook:true });
      models.User.hasMany(models.Like, { onDelete: 'CASCADE', hook:true });
      models.User.hasMany(models.Comment, { onDelete: 'CASCADE', hook:true });
    }
  };
  User.init({
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    password: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};