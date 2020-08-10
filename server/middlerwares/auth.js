const { User } = require('../models/index.js')
const { decode } = require('../helpers/jwt.js')

const auth = async (req, res, next)  => {
  try{
    if(req.headers.access_token) {
      let verify = decode(req.headers.access_token)

      let result = await User.findOne({
        where :{
          id : verify.id
        }
      })
      if (result) {
        console.log('lewat sinis bpy')
        req.currentUserId = result.id
        next()
      } else {
        res.status(404).json({msg:'User not found'})
      }
    } else {
      res.status(400).json({msg:'Unauthentication'})
    }
  } catch(err) {
    res.status(400).json({name:'Unauthentication', msg:err})
  }
}

module.exports = {auth}