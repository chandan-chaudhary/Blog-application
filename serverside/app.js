const express = require('express');
const morgan = require('morgan');

// OWN FILES
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// run if process is in development
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello world', new Date().toDateString());
  next();
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
