# Heroku Deployment

In this assignment, you'll deploy both the server and client applications to Heroku.

## Pre-deployment

Complete the following steps to prepare for deployment.

1. Create a Heroku app called `USERNAME-galvanize-bookshelf` where `USERNAME` is your GitHub username in lowercase form.
1. Generate a secret key for signing session information and set it to the `SESSION_SECRET` config variable of the new Heroku app.
1. Update the `package.json` file with the version of Node from your development environment.
1. Enable the Heroku PostgreSQL add-on for the new Heroku app.
1. Update the `knexfile.js` file with the `production` database connection information.
1. Update the `package.json` file with a `heroku-postbuild` script to migrate the production database.
1. Add and commit the changes to your local git repository.

## Deployment

1. Push the changes to the master branch of your Heroku remote.
1. Seed the production database by running a one-off command on Heroku.
1. Visit the production URL of the Heroku app.
1. If the application isn't working, check Heroku's logs.
1. Otherwise, celebrate with a beverage of choice!

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
