const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')

const connectDB = require('./config/db')
const authRoute = require('./routes/auth')
const homeRoute = require('./routes/home')
const todoRoute = require('./routes/todos')

// Set Port
const PORT = process.env.PORT || 5000

// Load config
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

// Return MongoDB connection
const clientPromise = connectDB().then(conn => conn.connection.getClient())

// Sets EJS for views
app.set('view engine', 'ejs')

// Static Folder
app.use(express.static('public'))

// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(
  session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ clientPromise })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', homeRoute)
app.use('/auth', authRoute)
app.use('/todos', todoRoute)

app.listen(
  PORT, 
  console.log(`Server running on port ${PORT}`)
)