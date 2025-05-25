const connectToMongo = require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 5005

app.use(express.json()) // Middleware to parse JSON bodies

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
// This code imports the connectToMongo function from the db.js file and calls it to establish a connection to the MongoDB database.
// It also sets up an Express server that listens on port 3000 and responds with "Hello World!" when the root URL (/) is accessed.