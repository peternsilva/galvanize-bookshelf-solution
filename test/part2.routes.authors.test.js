'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part2 routes authors', () => {
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

  test('GET /authors', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/authors')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 2,
        firstName: 'Bonnie',
        lastName: 'Eisenman',
        biography: 'Bonnie Eisenman is a software engineer at Twitter, with previous experience at Codecademy, Fog Creek Software, and Google. She has spoken at several conferences on topics ranging from ReactJS to musical programming and Arduinos. In her spare time, she enjoys building electronic musical instruments, tinkering with hardware projects, and laser-cutting chocolate. Find her on Twitter as @brindelle.',
        portraitUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/285/bonnie_eisenman.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 1,
        firstName: 'Douglas',
        lastName: 'Crockford',
        biography: 'Douglas Crockford is a Senior JavaScript Architect at Yahoo!, well known for introducing and maintaining the JSON (JavaScript Object Notation) format. He\'s a regular speaker at conferences on advanced JavaScript topics, and serves on the ECMAScript committee.',
        portraitUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/282/douglas_crawford.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 5,
        firstName: 'Ethan',
        lastName: 'Brown',
        biography: 'Ethan Brown is a senior software engineer at Pop Art, a Portland-based interactive marketing agency, where he is responsible for the architecture and implementation of web sites and web services for clients ranging from small businesses to international enterprise companies. He has over twenty years of programming experience, from embedded to the web, and has embraced the JavaScript stack as the web platform of the future.',
        portraitUrl: 'http://cdn.oreillystatic.com/images/people/154/ethan_brown.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 3,
        firstName: 'Kyle',
        lastName: 'Simpson',
        biography: 'Kyle Simpson is an Open Web Evangelist who\'s passionate about all things JavaScript. He\'s an author, workshop trainer, tech speaker, and OSS contributor/leader.',
        portraitUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 4,
        firstName: 'Shyam',
        lastName: 'Seshadri',
        biography: 'Currently based out of India, Shyam Seshadri is the CEO of Fundoo Solutions (http://www.befundoo.com), Ex-Googler, Author and Chef. He currently spends his time working on interesting product ideas, conducting training sessions internationally on AngularJS & NodeJS, and providing development and architecture consulting on AngularJS, NodeJS and Mobile applications. He conducts extensive, customized two and three day, hands-on workshops for AngularJS & NodeJS, which have been well received internationally.',
        portraitUrl: 'http://cdn.oreillystatic.com/images/people/154/shyam_seshadri-1.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }], done);

      /* eslint-enable max-len */
  });

  test('GET /authors/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/authors/1')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        firstName: 'Douglas',
        lastName: 'Crockford',
        biography: 'Douglas Crockford is a Senior JavaScript Architect at Yahoo!, well known for introducing and maintaining the JSON (JavaScript Object Notation) format. He\'s a regular speaker at conferences on advanced JavaScript topics, and serves on the ECMAScript committee.',
        portraitUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/282/douglas_crawford.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /authors', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/authors')
      .send({
        firstName: 'Allen B.',
        lastName: 'Downey',
        biography: 'Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master\'s and Bachelor\'s degrees from MIT.',
        portraitUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 6,
        firstName: 'Allen B.',
        lastName: 'Downey',
        biography: 'Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master\'s and Bachelor\'s degrees from MIT.',
        portraitUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('PATCH /authors/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .patch('/authors/1')
      .send({
        firstName: 'Allen B.',
        lastName: 'Downey',
        biography: 'Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master\'s and Bachelor\'s degrees from MIT.',
        portraitUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 1,
        firstName: 'Allen B.',
        lastName: 'Downey',
        biography: 'Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master\'s and Bachelor\'s degrees from MIT.',
        portraitUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('DELETE /authors/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .del('/authors/1')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        firstName: 'Douglas',
        lastName: 'Crockford',
        biography: 'Douglas Crockford is a Senior JavaScript Architect at Yahoo!, well known for introducing and maintaining the JSON (JavaScript Object Notation) format. He\'s a regular speaker at conferences on advanced JavaScript topics, and serves on the ECMAScript committee.',
        portraitUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/282/douglas_crawford.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('GET /authors/:id/books', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/authors/1/books')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        authorId: 1,
        title: 'JavaScript, The Good Parts',
        genre: 'JavaScript',
        description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }], done);

      /* eslint-enable max-len */
  });
});
