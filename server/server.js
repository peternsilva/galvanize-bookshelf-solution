'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const userRoutes = require('./routes/users');
const authorRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');

const app = express();

app.disable('x-powered-by');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  keys: [
    'key1',//process.env.SESSION_KEY1,
    'key2',//process.env.SESSION_KEY2
  ]
}));

app.use(express.static(path.join('..', 'client')));
app.use('/users', userRoutes);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.use((_req, _res, next) => {
  let err = new Error();
  err.status = 404;
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).send(err);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
