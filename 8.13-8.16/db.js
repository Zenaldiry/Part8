const mongoose = require('mongoose');
const connectToDatabase = async (url) => {
  console.log('connecting to mongodb');
  try {
    await mongoose.connect(url);
    console.log('connected to mongodb');
  } catch (error) {
    console.log('connection to db failed', error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
