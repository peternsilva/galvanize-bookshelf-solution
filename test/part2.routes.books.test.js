'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part2 routes books', () => {
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

  test('GET /books', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/books')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 7,
        title: 'AngularJS: Up and Running',
        author: 'Shyam Seshadri',
        genre: 'JavaScript',
        description: 'If you want to get started with AngularJS, either as a side project, an additional tool, or for your main work, this practical guide teaches you how to use this meta-framework step-by-step, from the basics to advanced concepts. By the end of the book, you\'ll understand how to develop a large, maintainable, and performant application with AngularJS.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920033486/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 1,
        title: 'JavaScript, The Good Parts',
        author: 'Douglas Crockford',
        genre: 'JavaScript',
        description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 2,
        title: 'Learning React Native',
        author: 'Bonnie Eisenman',
        genre: 'JavaScript',
        description: 'Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you\'ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You\'ll also discover how to access platform features such as the camera, user location, and local storage.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/287/learning_react_native.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 8,
        title: 'Web Development with Node and Express',
        author: 'Ethan Brown',
        genre: 'JavaScript',
        description: 'Learn how to build dynamic web applications with Express, a key component of the Node/JavaScript development stack. In this hands-on guide, author Ethan Brown teaches you the fundamentals through the development of a fictional application that exposes a public website and a RESTful API. You\'ll also learn web architecture best practices to help you build single-page, multi-page, and hybrid web apps with Express.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920032977/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 5,
        author: 'Kyle Simpson',
        title: 'You Don\'t Know JS: Async & Performance',
        genre: 'JavaScript',
        description: 'No matter how much experience you have with JavaScript, odds are you don\'t fully understand the language. As part of the "You Don\'t Know JS" series, this concise yet in-depth guide focuses on new asynchronous features and performance techniques—including Promises, generators, and Web Workers—that let you create sophisticated single-page web applications and escape callback hell in the process.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/288/you_dont_know_js_async_and_performance.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 4,
        title: 'You Don\'t Know JS: ES6 & Beyond',
        author: 'Kyle Simpson',
        genre: 'JavaScript',
        description: 'No matter how much experience you have with JavaScript, odds are you don\'t fully understand the language. As part of the "You Don\'t Know JS" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/es6_and_beyond.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 6,
        title: 'You Don\'t Know JS: Scope & Closures',
        author: 'Kyle Simpson',
        genre: 'JavaScript',
        description: 'No matter how much experience you have with JavaScript, odds are you don\'t fully understand the language. This concise yet in-depth guide takes you inside scope and closures, two core concepts you need to know to become a more efficient and effective JavaScript programmer. You\'ll learn how and why they work, and how an understanding of closures can be a powerful part of your development skillset.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/289/you_dont_know_js_scopes_and_closures.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 3,
        title: 'You Don\'t Know JS: Up & Going',
        author: 'Kyle Simpson',
        genre: 'JavaScript',
        description: 'It\'s easy to learn parts of JavaScript, but much harder to learn it completely—or even sufficiently—whether you\'re new to the language or have used it for years. With the "You Don\'t Know JS" book series, you\'ll get a more complete understanding of JavaScript, including trickier parts of the language that many experienced JavaScript programmers simply avoid.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/286/you_dont_know_js_up_and_going.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }], done);

      /* eslint-enable max-len */
  });

  test('GET /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/books/1')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        title: 'JavaScript, The Good Parts',
        author: 'Douglas Crockford',
        genre: 'JavaScript',
        description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /books', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/books')
      .send({
        title: 'Think Python',
        author: 'Allen B. Downey',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 9,
        title: 'Think Python',
        author: 'Allen B. Downey',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('PATCH /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .patch('/books/1')
      .send({
        title: 'Think like Python',
        author: 'Allen B. Downey',
        genre: 'Python stuff',
        description: 'More Python',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 1,
        title: 'Think like Python',
        author: 'Allen B. Downey',
        genre: 'Python stuff',
        description: 'More Python',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('DELETE /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .del('/books/1')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        title: 'JavaScript, The Good Parts',
        author: 'Douglas Crockford',
        genre: 'JavaScript',
        description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg'
      }, done);

      /* eslint-enable max-len */
  });
});
