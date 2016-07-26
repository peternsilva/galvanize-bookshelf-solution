# Express and Knex

In this assignment, you'll build a RESTful, database-driven HTTP server, using Express and Knex, to manage your migrated and seeded database. Your server will handle the following HTTP requests and send the appropriate HTTP response.

**NOTE:** The information in both the request body and the response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                          | Response Status | Response Body                                                               |
|----------------|--------------------|-----------------------------------------------------------------------|-----------------|-----------------------------------------------------------------------------|
| `GET`          | `/authors`         | N/A                                                                   | `200`           | `[{ id: 1, "firstName": "Douglas", "lastName": "Crockford", ... }, ...]`    |
| `GET`          | `/authors/1`       | N/A                                                                   | `200`           | `{ id: 1, "firstName": "Douglas", "lastName": "Crockford", ... }`           |
| `POST`         | `/authors`         | `{ "firstName": "Shelley", "lastName": "Powers", ... }`               | `200`           | `{ id: 6, "firstName": "Shelley", "lastName": "Powers", ... }`              |
| `PATCH`        | `/authors/6`       | `{ "biography": "Author, web developer, and technology architect." }` | `200`           | `{ id: 6, "firstName": "Shelley", "lastName": "Powers", ... }`              |
| `DELETE`       | `/authors/6`       | N/A                                                                   | `200`           | `{ "firstName": "Shelley", "lastName": "Powers", ... }`                     |
| `GET`          | `/authors/1/books` | N/A                                                                   | `200`           | `[{ id: 1, authorId: 1, "title": "JavaScript, The Good Parts", ... }, ...]` |

(books that the author wrote)

In the `routes/authors.js` module, add the necessary middleware to handle above RESTful route table. Note that the middleware for the following HTTP requests must respond with an array of entities ordered by their `id` attribute.

- `GET /authors`
- `GET /authors/:id/books`

You can run the following test suite to verify the positive case when each middleware responds with a `200` status code.

```shell
npm test test/part2.routes.authors.test.js
```

## Bonus

| Request Method | Request URL        | Request Body                                                          | Response Status | Response Body                                                                |
|----------------|--------------------|-----------------------------------------------------------------------|-----------------|------------------------------------------------------------------------------|
| `GET`          | `/books`           | N/A                                                                   | `200`           | `[{ id: 1, authorId: 1, "title": "JavaScript, The Good Parts", ... }, ...]`  |
| `GET`          | `/books/1`         | N/A                                                                   | `200`           | `{ id: 1, authorId: 1, "title": "JavaScript, The Good Parts", ... }`         |
| `POST`         | `/books`           | `{ authorId: 3, "title": "You Don't Know JS: Types & Grammar", ... }` | `200`           | `{ id: 9, authorId: 3, "title": "You Don't Know JS: Types & Grammar", ... }` |
| `PATCH`        | `/books/9`         | `{ description: "Looks at type coercion problems." }`                 | `200`           | `{ id: 9, authorId: 3, "title": "You Don't Know JS: Types & Grammar", ... }` |
| `DELETE`       | `/books/9`         | N/A                                                                   | `200`           | `{ authorId: 3, "title": "You Don't Know JS: Types & Grammar", ... }`        |

In the `routes/books.js` module, add the necessary middleware to handle above RESTful route table. Note that the middleware for the following HTTP requests must respond with an array of entities ordered by their `id` attribute.

- `GET /books`

You can run the following test suite to verify the positive case when each middleware responds with a `200` status code.

```shell
npm test test/part2.routes.books.test.js
```

## Bonus

Linting
