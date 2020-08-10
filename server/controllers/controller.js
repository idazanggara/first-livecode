const { User, Food } = require('../models/index.js')
const {generateToken, decode} = require('../helpers/jwt.js')
const { decrypt } = require('../helpers/bcrypt.js')

class Controller{

  //user
  static register(req, res, next){
    const {email, password} = req.body
    // console.log(email,password)
    User.create({email, password})
    .then(user =>{
      res.status(201).json({id:user.id,email:user.email})
    })
    .catch(err => {
      res.status(500).json({msg:err.message})
    })

    // res.status(200).json({add:'hello'})
  }

  static login(req, res, next){
    User.findOne({
      where: {email: req.body.email}
    })
    .then(result => {
      // res.status(200).json({add:result})
      if(result) {
        const compare = decrypt(req.body.password, result.password)
        if (compare) {
          const useData = {
            id: result.id,
            email: result.email
          }
          const access_token = generateToken(useData)
          res.status(200).json({
            id: result.id,
            email: result.email,
            access_token
          })
        } else {
          res.status(400).json({msg: 'Invalid password/username'})
        }
      } else {
        res.status(400).json({msg: 'Invalid password/username'})
      }

    })
    .catch (err => {
      res.status(500).json({msg:err.message})
    })
  }

  // batas user
  // ==========================================================================================

  // food
  static addFood(req, res, next){
    const food = {
      title: req.body.title,
      price: req.body.price,
      ingredients: req.body.ingredients,
      tag: req.body.tag,
      UserId:req.currentUserId
    }
    Food.create(food)
    .then(result => {
      res.status(201).json({id:result.id, title:result.title, price:result.price, ingredients:result.ingredients, tag:result.tag})
    })
  }

  static readFood(req, res, next){
    // res.status(200).json({add:'hao'})
    Food.findAll({
      where: {
        UserId: req.currentUserId
      }
    })
    .then( result => {
      res.status(200).json({result})
    })
    .catch (err => {
      res.status(500).json({msg:err.message})
    })
  }

  static deleteFood(req, res, next){
    console.log('sini')
    Food.destroy({
      where:{
        id:req.params.id
      }
    }).then(result => {
      res.status(200).json({message:'record has been deleted succesfully'})
    })
    .catch(err => {
      res.status(500).json({msg:err.message})
    })
  }
}

module.exports = { Controller }