# Express and Knex

In this assignment, you'll build a RESTful, database-driven HTTP server, using Express and Knex, to manage your migrated and seeded database.

## Authors

Add route middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and the response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                          | Response Status | Response Body                                                               |
|----------------|--------------------|-----------------------------------------------------------------------|-----------------|-----------------------------------------------------------------------------|
| `GET`          | `/authors`         | N/A                                                                   | `200`           | `[{ id: 1, "firstName": "Douglas", "lastName": "Crockford", ... }, ...]`    |
| `GET`          | `/authors/1`       | N/A                                                                   | `200`           | `{ id: 1, "firstName": "Douglas", "lastName": "Crockford", ... }`           |
| `POST`         | `/authors`         | `{ "firstName": "Shelley", "lastName": "Powers", ... }`               | `200`           | `{ id: 6, "firstName": "Shelley", "lastName": "Powers", ... }`              |
| `PATCH`        | `/authors/6`       | `{ "biography": "Author, web developer, and technology architect." }` | `200`           | `{ id: 6, "firstName": "Shelley", "lastName": "Powers", ... }`              |
| `DELETE`       | `/authors/6`       | N/A                                                                   | `200`           | `{ "firstName": "Shelley", "lastName": "Powers", ... }`                     |
| `GET`          | `/authors/1/books` | N/A                                                                   | `200`           | `[{ id: 1, authorId: 1, "title": "JavaScript, The Good Parts", ... }, ...]` |

More specifically, the server should:

- Handle the above RESTful route table with middleware defined in the `routes/authors.js` module.

- Respond to a `GET /authors` request with all author entities ordered by their `first_name` and `last_name` columns.

- Respond to a `GET /authors/:id/books` request with all books entities for a specific author ordered by their `title` column.

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part2.routes.authors.test.js
```

## Books

Add route middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and the response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                          | Response Status | Response Body                                                                |
|----------------|--------------------|-----------------------------------------------------------------------|-----------------|------------------------------------------------------------------------------|
| `GET`          | `/books`           | N/A                                                                   | `200`           | `[{ id: 1, authorId: 1, "title": "JavaScript, The Good Parts", ... }, ...]`  |
| `GET`          | `/books/1`         | N/A                                                                   | `200`           | `{ id: 1, authorId: 1, "title": "JavaScript, The Good Parts", ... }`         |
| `POST`         | `/books`           | `{ authorId: 3, "title": "You Don't Know JS: Types & Grammar", ... }` | `200`           | `{ id: 9, authorId: 3, "title": "You Don't Know JS: Types & Grammar", ... }` |
| `PATCH`        | `/books/9`         | `{ description: "Looks at type coercion problems." }`                 | `200`           | `{ id: 9, authorId: 3, "title": "You Don't Know JS: Types & Grammar", ... }` |
| `DELETE`       | `/books/9`         | N/A                                                                   | `200`           | `{ authorId: 3, "title": "You Don't Know JS: Types & Grammar", ... }`        |

More specifically, the server should:

- Handle the above RESTful route table with middleware defined in the `routes/books.js` module.

- Respond to a `GET /books` request with all book entities ordered by their `title` column.

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part2.routes.books.test.js
```

## Linting

Using your preferred ESLint rules, lint your project with the `npm run lint .` command.

## Bonus

Update the route middleware to handle the following HTTP requests and send back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body use the `text/plain` content type.

| Request Method | Request URL           | Request Body                 | Response Status | Response Body                  |
|----------------|-----------------------|------------------------------|-----------------|--------------------------------|
| `GET`          | `/authors/9000`       | N/A                          | `404`           | `Not Found`                    |
| `GET`          | `/authors/-1`         | N/A                          | `404`           | `Not Found`                    |
| `GET`          | `/authors/one`        | N/A                          | `404`           | `Not Found`                    |
| `POST`         | `/authors`            | `{ "firstName": "", ... }`   | `400`           | `First name must not be blank` |
| `POST`         | `/authors`            | `{ "lastName": "", ... }`    | `400`           | `Last name must not be blank`  |
| `POST`         | `/authors`            | `{ "biography": "", ... }`   | `400`           | `Biography must not be blank`  |
| `POST`         | `/authors`            | `{ "portraitUrl": "", ... }` | `400`           | `Portrait must not be blank`   |
| `PATCH`        | `/authors/9000`       | N/A                          | `404`           | `Not Found`                    |
| `PATCH`        | `/authors/-1`         | N/A                          | `404`           | `Not Found`                    |
| `PATCH`        | `/authors/one`        | N/A                          | `404`           | `Not Found`                    |
| `DELETE`       | `/authors/9000`       | N/A                          | `404`           | `Not Found`                    |
| `DELETE`       | `/authors/-1`         | N/A                          | `404`           | `Not Found`                    |
| `DELETE`       | `/authors/one`        | N/A                          | `404`           | `Not Found`                    |
| `GET`          | `/authors/9000/books` | N/A                          | `404`           | `Not Found`                    |
| `GET`          | `/authors/-/books1`   | N/A                          | `404`           | `Not Found`                    |
| `GET`          | `/authors/one/books`  | N/A                          | `404`           | `Not Found`                    |

More specifically, the server should:

- Handle the above RESTful route table with middleware defined in the `routes/authors.js` module.

- Ensure the route middleware handles the successful HTTP requests as before.

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part2.routes.authors.bonus.test.js
```

## Bonus

Update the route middleware to handle the following HTTP requests and send back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body use the `text/plain` content type.

| Request Method | Request URL         | Request Body                 | Response Status | Response Body                   |
|----------------|---------------------|------------------------------|-----------------|---------------------------------|
| `GET`          | `/books/9000`       | N/A                          | `404`           | `Not Found`                     |
| `GET`          | `/books/-1`         | N/A                          | `404`           | `Not Found`                     |
| `GET`          | `/books/one`        | N/A                          | `404`           | `Not Found`                     |
| `POST`         | `/books`            | `{ "title": "", ... }`       | `400`           | `Title name must not be blank`  |
| `POST`         | `/books`            | `{ "genre": "", ... }`       | `400`           | `Genre name must not be blank`  |
| `POST`         | `/books`            | `{ "description": "", ... }` | `400`           | `Description must not be blank` |
| `POST`         | `/books`            | `{ "coverUrl": "", ... }`    | `400`           | `Cover must not be blank`       |
| `POST`         | `/books`            | `{ "authorId": "", ... }`    | `400`           | `Author must be selected`       |
| `POST`         | `/books`            | `{ "authorId": 9000, ... }`  | `400`           | `Author does not exist`         |
| `PATCH`        | `/books/9000`       | N/A                          | `404`           | `Not Found`                     |
| `PATCH`        | `/books/-1`         | N/A                          | `404`           | `Not Found`                     |
| `PATCH`        | `/books/one`        | N/A                          | `404`           | `Not Found`                     |
| `PATCH`        | `/books/1`          | `{ "authorId": 9000, ... }`  | `400`           | `Author does not exist`         |
| `DELETE`       | `/books/9000`       | N/A                          | `404`           | `Not Found`                     |
| `DELETE`       | `/books/-1`         | N/A                          | `404`           | `Not Found`                     |
| `DELETE`       | `/books/one`        | N/A                          | `404`           | `Not Found`                     |

More specifically, the server should:

- Handle the above RESTful route table with middleware defined in the `routes/books.js` module.

- Ensure the route middleware handles the successful HTTP requests as before.

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part2.routes.books.bonus.test.js
```

## Bonus

Once you're satisfied, find a classmate and see if he or she would like some help.
