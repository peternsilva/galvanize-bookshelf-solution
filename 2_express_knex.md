# Express and Knex

In this assignment, you'll build a RESTful, database-driven HTTP server, using Express and Knex, to manage your migrated and seeded database.

## Authors

Add route handlers for the following HTTP requests and send back the associated HTTP response. The information in both the request body and the response body use the `application/json` content type.

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

You can run the following test suite to verify the positive case when each middleware responds with a `200` status code.

```shell
npm test test/part2.routes.authors.test.js
```

## Books

Add route handlers for the following HTTP requests and send back the associated HTTP response. The information in both the request body and the response body use the `application/json` content type.

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

Using your preferred ESLint rules, lint your project with the `npm run lint .` command.

## Bonus

Next, update your server to handle the following problem HTTP requests and send the associated HTTP response.

**NOTE:** The information in only the request body uses the `application/json` content type.

| Request Method | Request URL           | Request Body                 | Response Status | Response Content-Type | Response Body                  |
|----------------|-----------------------|------------------------------|-----------------|-----------------------|--------------------------------|
| `GET`          | `/authors/9000`       | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `GET`          | `/authors/-1`         | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `GET`          | `/authors/one`        | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `POST`         | `/authors`            | `{ "firstName": "", ... }`   | `400`           | `text/plain`          | `First name must not be blank` |
| `POST`         | `/authors`            | `{ "lastName": "", ... }`    | `400`           | `text/plain`          | `Last name must not be blank`  |
| `POST`         | `/authors`            | `{ "biography": "", ... }`   | `400`           | `text/plain`          | `Biography must not be blank`  |
| `POST`         | `/authors`            | `{ "portraitUrl": "", ... }` | `400`           | `text/plain`          | `Portrait must not be blank`   |
| `PATCH`        | `/authors/9000`       | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `PATCH`        | `/authors/-1`         | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `PATCH`        | `/authors/one`        | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `DELETE`       | `/authors/9000`       | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `DELETE`       | `/authors/-1`         | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `DELETE`       | `/authors/one`        | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `GET`          | `/authors/9000/books` | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `GET`          | `/authors/-/books1`   | N/A                          | `404`           | `text/plain`          | `Not Found`                    |
| `GET`          | `/authors/one/books`  | N/A                          | `404`           | `text/plain`          | `Not Found`                    |

In the `routes/authors.js` module, update the necessary middleware to handle above RESTful route table. Make sure the route handler handles the positive case case before.

You can run the following test suite to verify the negative cases when the middleware responds with a `400` status code.

```shell
npm test test/part2.routes.authors.bonus.test.js
```

## Bonus

Once you're satisfied, find a classmate and see if he or she would like some help.
