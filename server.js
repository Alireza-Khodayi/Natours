const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! 💥 Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

//Connecting to Database
const DB = process.env.DATABASE;
const connectToDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
};
connectToDB();

//Running the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
