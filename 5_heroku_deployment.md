# Heroku Deployment

In this assignment, you'll deploy the server and client applications to Heroku.

## Pre-deployment

To deploy the applications to Heroku, complete the following steps.

1. Create a Heroku app called `USERNAME-galvanize-bookshelf` where `USERNAME` is your GitHub username in lowercase.
1. Generate a secret key that'll be used to sign session information on the production environment.
1. Update the `package.json` file with the version of Node from your development environment.
1. Enable the Heroku PostgreSQL add-on for your new Heroku app.
1. Update the `knexfile.js` file with the `production` database connection information.
1. Update the `package.json` file with a `heroku-postbuild` script to migrate the production database.
1. Add and commit the changes to your local git repository.
1. Push the changes to the master branch of your Heroku remote.
1. Seed the production database by running a one-off command on Heroku.
1. After about one minute, check that the production database has the correct number of tables and rows.

## Post-deployment

Once your application is deployed, add its URL to your Github repository.

Test

```shell
npm test
```

Lint

```shell
npm run lint .
```

## Bonus

Schedule the application to re-seed the database every hour.

```shell
npm run knex seeds:run
```
