const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

const generateToken = (payload) => {
  return jwt.sign(payload,SECRET)
}

const decode =  (token) => {
  return jwt.verify(token,SECRET)
}

module.exports = { generateToken , decode}