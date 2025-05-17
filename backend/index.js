const connectToMongo = require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Aniket!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// This code imports the connectToMongo function from the db.js file and calls it to establish a connection to the MongoDB database.
// It also sets up an Express server that listens on port 3000 and responds with "Hello World!" when the root URL (/) is accessed.