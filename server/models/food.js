'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.User)
    }
  };
  Food.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty :{
          args: true,
          msg: 'Field Title Required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty :{
          args: true,
          msg: 'Field Price Required'
        }
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      validate : {
        notEmpty :{
          args: true,
          msg: 'Field Ingredients Required'
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      validate : {
        notEmpty :{
          args: true,
          msg: 'Field Tag Required'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};