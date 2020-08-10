'use strict';
const {
  Model
} = require('sequelize');

const {encrypt} = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Food)
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args:true,
          msg: 'Must be a valid email'
        },
        notEmpty :{
          args: true,
          msg: 'Field email Required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty :{
          args: true,
          msg: 'Field Password Required'
        }
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate : (User,options) => {
        User.password = encrypt(User.password)
      }
    },
    modelName: 'User',
  });
  return User;
};