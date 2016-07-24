'use strict';

process.env.NODE_ENV = 'test';

const _ = require('lodash');
const assert = require('chai').assert;
const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part3 routes users', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('POST /users', (done) => {
    const password = 'ilikebigcats';

    request(server)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        password
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 2,
        firstName: 'John',
        lastName: 'Siracusa',
        email: 'john.siracusa@gmail.com'
      })
      .end((httpErr, _res) => {
        if (httpErr) {
          return done(httpErr);
        }

        knex('users')
          .where('id', 2)
          .first()
          .then((row) => {
            const user = _.mapKeys(row, (v, k) => _.camelCase(k));
            const hashedPassword = user.hashedPassword;

            delete user.hashedPassword;
            delete user.createdAt;
            delete user.updatedAt;

            assert.deepEqual(user, {
              id: 2,
              firstName: 'John',
              lastName: 'Siracusa',
              email: 'john.siracusa@gmail.com'
            });

            // eslint-disable-next-line no-sync
            const isMatch = bcrypt.compareSync(password, hashedPassword);

            assert.isTrue(isMatch, "passwords don't match");
            done();
          })
          .catch((dbErr) => {
            done(dbErr);
          });
      });
  });
});
