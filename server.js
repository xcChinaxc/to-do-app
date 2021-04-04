const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 5000;
require('dotenv').config({ path: '.env'})

let db,
dbConnectionStr = process.env.DB_STRING,
dbName = 'to-do-list';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
    const tasksCollection = db.collection('tasks');
  });
    
 app.set('view engine', 'ejs')
 app.use(express.static('public'))
 app.use(express.urlencoded({ extended: true }))
 app.use(express.json())

 app.get('/', (req, res) => {
   db.collection('tasks').find().toArray()
   .then(results => {
     res.render('index.ejs', {tasks: results });
    })
   .catch()
 })

 app.post('/taskItem', (req, res) => {
   tasksCollection.insertOne(req.body)
   .then(result => {
     res.redirect('/')
     console.log(result);
   })
   .catch(err => console.log(err))
 })

 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });




