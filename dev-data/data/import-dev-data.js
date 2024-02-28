const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

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

//Read Json File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

//Import Data to Database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete All Data from Collection

const deleteAllData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data Deleted Successfully!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteAllData();
}
