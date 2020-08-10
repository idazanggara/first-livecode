const { Food } = require('../models/index.js')

const author = (req, res, next) => {
  Food.findOne({
    where: { id: req.params.id}
  })
  .then(result => {
    if (result){
      console.log(result.UserId , req.currentUserId)
      if(result.UserId === req.currentUserId) {
        console.log('lewat sinis dulu bray authorization')
        next()
      } else {
        res.status(400).json({msg:'Unauthorization'})
      }
    }else{
      res.status(404).json({msg:'User not found'})

    }
  })
  .catch (err => {
    res.status(400).json({name:'Unauthorization', msg:err})

  })
}

module.exports = {author}