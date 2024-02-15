const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

const app = express();

// 1) Middlewares
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public/`));

// 2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
