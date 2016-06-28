# Express and Knex

For this assignment, you'll build a RESTful, database-driven HTTP server, using Express and Knex, to manage your migrated and seeded database. Your server will handle the following HTTP requests and send the appropriate HTTP response.

**NOTE:** Both the request body and the response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                             | Response Status | Response Body                                                                                                                                |
|----------------|--------------------|----------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `GET`          | `/books`           | N/A                                                                                                      | `200`           | `[{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }, ...]`                               |                                            |
| `GET`          | `/books/3`         | N/A                                                                                                      | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `POST`         | `/books`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`  | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `PATCH`        | `/books/3`         | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`  | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `DELETE`       | `/books/3`         | N/A                                                                                                      | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `GET`          | `/authors`         | N/A                                                                                                      | `200`           | `[{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }, ...]`                              |
| `GET`          | `/authors/3`       | N/A                                                                                                      | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `POST`         | `/authors`         | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }` | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `PATCH`        | `/authors/3`       | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }` | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `DELETE`       | `/authors/3`       | N/A                                                                                                      | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `GET`          | `/authors/3/books` | N/A                                                                                                      | `200`           | `[{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }, ...]` (books that the author wrote) |

To get started, install the necessary dependencies via NPM.

```shell
cd galvanize-bookshelf
npm install
```

Then, add the necessary middleware to handle both the `authors` and the `books` RESTFUL routes from above.

- `routes/authors.js`
- `routes/books.js`

**NOTE:** The `GET` all requests (`/books`, `/authors`, `/authors/:id/books`) will need to be ordered by `id`

This assignment can test you route specified above. To run the test suite, running the following shell command

**NOTE:** For each route handler, the test suite only tests the _positive_ case where the server responds with a `200` status code.

```shell
npm test test/part2.authors.test.js
npm test test/part2.books.test.js
```
