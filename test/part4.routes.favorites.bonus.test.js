'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part4 routes favorites bonus', () => {
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

  test('GET /favorites without authentication', (done) => {
    request(server)
      .get('/favorites')
      .expect('Content-Type', /plain/)
      .expect(401, 'Unauthorized', done);
  });

  test('GET /favorites/check?bookId=1 without authentication', (done) => {
    request(server)
      .get('/favorites/check?bookId=1')
      .expect('Content-Type', /plain/)
      .expect(401, 'Unauthorized', done);
  });

  test('POST /favorites without authentication', (done) => {
    request(server)
      .post('/favorites')
      .set('Content-Type', 'application/json')
      .send({ bookId: 2 })
      .expect('Content-Type', /plain/)
      .expect(401, 'Unauthorized', done);
  });

  test('DELETE /favorites without authentication', (done) => {
    request(server)
      .del('/favorites')
      .set('Content-Type', 'application/json')
      .send({ bookId: 1 })
      .expect('Content-Type', /plain/)
      .expect(401, 'Unauthorized', done);
  });
});
