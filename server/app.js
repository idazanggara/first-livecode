required('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 3000
const {Controller} = require('./controllers/controller.js')
const errorHandler = require('./middlerwares/errorHandler.js')

app.use(cors())
app.use(express.urlencoded({ extended:true}))
app.use(express.json())

// user
app.post('/register', Controller.register)
app.post('/login', Controller.login)

// foods
app.post('/foods', Controller.addFood)
app.get('/foods', Controller.readFood)
app.delete('/foods/:id', Controller.deleteFood)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`connection to http://localhost:${port}/`)
})