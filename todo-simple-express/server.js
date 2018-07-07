const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

// mongodb://demo:demo123@ds125831.mlab.com:25831/cristiantest
MongoClient.connect('mongodb://demo:demo123@ds125831.mlab.com:25831/cristiantest', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 8000, () => {
    console.log('listening on 8000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('todoitems').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.get('/react', (req, res) => {
  db.collection('todoitems').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.json(result)
  })
})

app.post('/todoitems', (req, res) => {
  db.collection('todoitems').save({item:req.body.item, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({item:req.body.item}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/deleteitem', (req, res) => {
  console.log("working?")
  db.collection('todoitems').findOneAndDelete({item:req.body.item}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
