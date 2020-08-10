require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 3000
const {Controller} = require('./controllers/controller.js')
const errorHandler = require('./middlerwares/errorHandler.js')
const {auth} = require('./middlerwares/auth.js')
const {author} = require('./middlerwares/author.js')

app.use(cors())
app.use(express.urlencoded({ extended:true}))
app.use(express.json())

// user
app.post('/register', Controller.register)
app.post('/login', Controller.login)

// foods

app.post('/foods', auth,Controller.addFood)
app.get('/foods',auth, Controller.readFood)
app.delete('/foods/:id', auth,author, Controller.deleteFood)
// app.use(errorHandler)

app.listen(port, () => {
  console.log(`connection to http://localhost:${port}/`)
})