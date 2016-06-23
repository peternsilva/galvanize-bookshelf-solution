'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res, next) => {
  // render login page
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  knex('users').first()
    .where('email', email)
    .then((user) => {
      let data = {
        id: user.id
      };
      let secret = process.env.SECRET || 'secret';
      let options = {
        expiresInMinutes: 15
      };
      
      jwt.sign(data, secret, options, (err, token) => {
        if (err) {
          return next(err);
        }

        res.send(token);
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/register', (req, res, next) => {
  // render register page
});

router.post('/register', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  knex('users').where('email', email)
    .then((data) => {
      if (data.length) {
        let err = new Error();
        err.status = 409;
        return next(err);
      }

      bcrypt.hash(password, 10, (err, hash) => {
        knex('users').returning('*')
          .insert({
            email: email,
            password: hash,
            admin: false
          })
          .then((user) => {
            res.status(200).send(user[0]);
            // login newly registered user
          })
          .catch((err) => {
            return next(err);
          });
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/logout', (req, res, next) => {
  // logout user
  // reidrect to home page
});

module.exports = router;
