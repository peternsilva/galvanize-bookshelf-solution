# Heroku Deployment

In this assignment, you'll deploy both the server and client applications to Heroku.

## Pre-deployment

First, complete the following steps to prepare for deployment.

1. Create a Heroku app called `USERNAME-galvanize-bookshelf` where `USERNAME` is your GitHub username in lowercase form.
1. Generate a secret key for signing session information and set it to the `SESSION_SECRET` config variable of the new Heroku app.
1. Update the `package.json` file with the version of Node from your development environment.
1. Enable the Heroku PostgreSQL add-on for the new Heroku app.
1. Update the `knexfile.js` file with the `production` database connection information.
1. Update the `package.json` file with a `heroku-postbuild` script to migrate the production database.
1. Add and commit the changes to your local git repository.

## Deployment

Next, complete the following steps to deployment your applications.

1. Push the changes to the master branch of your Heroku remote.
1. Seed the production database by running a one-off command on Heroku.
1. Visit the Heroku app at `https://USERNAME-galvanize-bookshelf.herokuapp.com`.
1. If the application isn't working, check Heroku's logs.
1. Otherwise, celebrate with a beverage of choice!

## Post-deployment

Finally, complete the following steps after deployment.

1. Add `https://USERNAME-galvanize-bookshelf.herokuapp.com` to your Github repository's URL.
1. Run the full test suite with `npm test` and fix any test errors including bonus tests.
1. Run the linter with `npm run lint .` and fix any linting errors.

## Bonus

Use the [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler) add-on to re-seed the production database with `npm run knex seeds:run` every hour.

## Bonus

Once you're satisfied, find a classmate and see if that person would like some help.
