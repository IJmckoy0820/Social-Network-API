const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/socialNetDB';

const connectDB = () => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connection established'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));
};

const db = mongoose.connection;

module.exports = { connectDB, db };