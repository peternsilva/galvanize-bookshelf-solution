'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const authors = require('./routes/authors');
const books = require('./routes/books');
const session = require('./routes/session');
const users = require('./routes/users');
const usersBooks = require('./routes/users_books');

const app = express();

app.disable('x-powered-by');

// eslint-disable-next-line default-case
switch (process.env.NODE_ENV) {
  case 'development':
    app.use(require('morgan')('dev'));
    break;

  case 'production':
    app.use(require('morgan')('short'));
    break;
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'bookshelf',
  secret: process.env.SESSION_SECRET
}));

app.use(express.static(path.join('public')));

app.use(authors);
app.use(books);
app.use(session);
app.use(users);
app.use(usersBooks);

app.use((_req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});

module.exports = app;
