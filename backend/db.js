const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inotebook'; // Replace with your MongoDB URI

const connectToMongo = async () => {
   await mongoose.connect(mongoURI);
   console.log("Connected to MongoDB");    
}

module.exports = connectToMongo;
// This function connects to the MongoDB database using Mongoose.
// It uses the connect function from Mongoose to establish a connection to the database.
// The connection URI is specified as 'mongodb://localhost:27017', which is the default URI for a local MongoDB instance.
// The connectToMongo function is exported as the default export of the module.
// The function logs a message to the console when the connection is successfully established.