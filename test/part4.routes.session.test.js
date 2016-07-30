'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part4 routes session', () => {
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

  test('GET /session false', (done) => {
    request(server)
      .get('/session')
      .expect('Content-Type', /json/)
      .expect(200, 'false', done);
  });

  test('POST /session', (done) => {
    request(server)
      .post('/session')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com',
        password: 'youreawizard'
      })
      .expect('set-cookie', /bookshelf=[a-zA-Z0-9=]*; path=\//)
      .expect('set-cookie', /bookshelf.sig=[a-zA-Z0-9=\-_]*; path=\//)
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 1,
        firstName: 'Joanne',
        lastName: 'Rowling',
        email: 'jkrowling@gmail.com',
      }, done);
  });

  test('GET /session true', (done) => {
    const agent = request.agent(server);

    request(server)
      .post('/session')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com',
        password: 'youreawizard'
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        agent.saveCookies(res);

        agent
          .get('/session')
          .expect('Content-Type', /json/)
          .expect(200, 'true', done);
      });
  });

  test('DELETE /session', (done) => {
    request(server)
      .delete('/session')
      .expect('set-cookie', /bookshelf=; path=\//)
      .expect('set-cookie', /bookshelf.sig=[a-zA-Z0-9=\-_]*; path=\//)
      .expect('Content-Type', /json/)
      .expect(200, 'true', done);
  });
});
