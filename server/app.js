'use strict';

const express = require('express');
const port = process.env.PORT || 8000;

const morgan = require('morgan');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const authorRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');

const app = express();

app.disable('x-powered-by');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/auth', authRoutes);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.use((_req, _res, next) => {
  let err = new Error();
  err.status = 404;
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.send('Error:', err);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
