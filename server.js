const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config({path: '.env'})

let db,
dbConnectionStr = process.env.DB_STRING,
dbName = 'to-do-list'
const PORT = process.env.PORT

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
  })
  .catch(err => {
    console.log(err)
  })

  app.set('view engine', 'ejs')
  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  
  app.get('/', async (req, res) => {
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    res.render('index.ejs', {tasks: todoItems, left: itemsLeft})
 })

 app.post('/createTodo', (req, res) => {
   db.collection('todos').insertOne({todo: req.body.todoItem, completed: false})
   .then(result => {
     console.log('Todo has been added!')
     res.redirect('/')
   })
 })

 app.put('/markComplete', (req, res) => {
   db.collection('todos').updateOne({todo: req.body.taskName}, {
     $set: {
       completed: true
     }
  })
  .then(result => {
    console.log('Todo has been marked complete!')
    res.json('Marked complete!')
  })
 })

 app.put('/undo', (req, res) => {
  db.collection('todos').updateOne({todo: req.body.taskName}, {
    $set: {
      completed: false
    }
 })
 .then(result => {
   console.log('Todo has been re-added!')
   res.json('Marked not complete!')
 })
})

 app.delete('/deleteTodo', (req, res)=> {
   db.collection('todos').deleteOne({todo: req.body.taskName})
   .then(result => {
     console.log('Todo has been deleted!')
     res.json('Deleted it')
   })
   .catch(err => console.log(err))
 })

  app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running!`)
  });