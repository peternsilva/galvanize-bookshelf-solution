/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');

suite('part1 seeds', () => {
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

  test('authors', (done) => {
    knex('authors').orderBy('id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [{
          id: 1,
          first_name: 'Douglas',
          last_name: 'Crockford',
          biography: "Douglas Crockford is a Senior JavaScript Architect at Yahoo!, well known for introducing and maintaining the JSON (JavaScript Object Notation) format. He's a regular speaker at conferences on advanced JavaScript topics, and serves on the ECMAScript committee.",
          portrait_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/282/douglas_crawford.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 2,
          first_name: 'Bonnie',
          last_name: 'Eisenman',
          biography: 'Bonnie Eisenman is a software engineer at Twitter, with previous experience at Codecademy, Fog Creek Software, and Google. She has spoken at several conferences on topics ranging from ReactJS to musical programming and Arduinos. In her spare time, she enjoys building electronic musical instruments, tinkering with hardware projects, and laser-cutting chocolate. Find her on Twitter as @brindelle.',
          portrait_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/285/bonnie_eisenman.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 3,
          first_name: 'Kyle',
          last_name: 'Simpson',
          biography: "Kyle Simpson is an Open Web Evangelist who's passionate about all things JavaScript. He's an author, workshop trainer, tech speaker, and OSS contributor/leader.",
          portrait_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 4,
          first_name: 'Shyam',
          last_name: 'Seshadri',
          biography: 'Currently based out of India, Shyam Seshadri is the CEO of Fundoo Solutions (http://www.befundoo.com), Ex-Googler, Author and Chef. He currently spends his time working on interesting product ideas, conducting training sessions internationally on AngularJS & NodeJS, and providing development and architecture consulting on AngularJS, NodeJS and Mobile applications. He conducts extensive, customized two and three day, hands-on workshops for AngularJS & NodeJS, which have been well received internationally.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/shyam_seshadri-1.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 5,
          first_name: 'Ethan',
          last_name: 'Brown',
          biography: 'Ethan Brown is a senior software engineer at Pop Art, a Portland-based interactive marketing agency, where he is responsible for the architecture and implementation of web sites and web services for clients ranging from small businesses to international enterprise companies. He has over twenty years of programming experience, from embedded to the web, and has embraced the JavaScript stack as the web platform of the future.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/ethan_brown.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }];

        /* eslint-enable max-len */

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i]
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('books', (done) => {
    knex('books').orderBy('id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [{
          id: 1,
          author_id: 1,
          title: 'JavaScript, The Good Parts',
          genre: 'JavaScript',
          description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.",
          cover_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 2,
          author_id: 2,
          title: 'Learning React Native',
          genre: 'JavaScript',
          description: "Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you'll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You'll also discover how to access platform features such as the camera, user location, and local storage.",
          cover_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/287/learning_react_native.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 3,
          author_id: 3,
          title: "You Don't Know JS: Up & Going",
          genre: 'JavaScript',
          description: "It's easy to learn parts of JavaScript, but much harder to learn it completely—or even sufficiently—whether you're new to the language or have used it for years. With the \"You Don't Know JS\" book series, you'll get a more complete understanding of JavaScript, including trickier parts of the language that many experienced JavaScript programmers simply avoid.",
          cover_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/286/you_dont_know_js_up_and_going.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 4,
          author_id: 3,
          title: "You Don't Know JS: ES6 & Beyond",
          genre: 'JavaScript',
          description: "No matter how much experience you have with JavaScript, odds are you don't fully understand the language. As part of the \"You Don't Know JS\" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.",
          cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/es6_and_beyond.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 5,
          author_id: 3,
          title: "You Don't Know JS: Async & Performance",
          genre: 'JavaScript',
          description: "No matter how much experience you have with JavaScript, odds are you don't fully understand the language. As part of the \"You Don't Know JS\" series, this concise yet in-depth guide focuses on new asynchronous features and performance techniques—including Promises, generators, and Web Workers—that let you create sophisticated single-page web applications and escape callback hell in the process.",
          cover_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/288/you_dont_know_js_async_and_performance.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 6,
          author_id: 3,
          title: "You Don't Know JS: Scope & Closures",
          genre: 'JavaScript',
          description: "No matter how much experience you have with JavaScript, odds are you don't fully understand the language. This concise yet in-depth guide takes you inside scope and closures, two core concepts you need to know to become a more efficient and effective JavaScript programmer. You'll learn how and why they work, and how an understanding of closures can be a powerful part of your development skillset.",
          cover_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/289/you_dont_know_js_scopes_and_closures.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 7,
          author_id: 4,
          title: 'AngularJS: Up and Running',
          genre: 'JavaScript',
          description: "If you want to get started with AngularJS, either as a side project, an additional tool, or for your main work, this practical guide teaches you how to use this meta-framework step-by-step, from the basics to advanced concepts. By the end of the book, you'll understand how to develop a large, maintainable, and performant application with AngularJS.",
          cover_url: 'http://akamaicovers.oreilly.com/images/0636920033486/lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 8,
          author_id: 5,
          title: 'Web Development with Node and Express',
          genre: 'JavaScript',
          description: "Learn how to build dynamic web applications with Express, a key component of the Node/JavaScript development stack. In this hands-on guide, author Ethan Brown teaches you the fundamentals through the development of a fictional application that exposes a public website and a RESTful API. You'll also learn web architecture best practices to help you build single-page, multi-page, and hybrid web apps with Express.",
          cover_url: 'http://akamaicovers.oreilly.com/images/0636920032977/lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }];

        /* eslint-enable max-len */

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
