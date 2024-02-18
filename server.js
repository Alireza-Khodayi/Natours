const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

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
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
