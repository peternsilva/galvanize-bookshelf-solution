'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const authorRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

const app = express();

app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  keys: [
    'key1',//process.env.SESSION_KEY1,
    'key2',//process.env.SESSION_KEY2
  ]
}));

app.use(express.static(path.join('public')));
app.use('/users', userRoutes);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.use((_req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port);
});
