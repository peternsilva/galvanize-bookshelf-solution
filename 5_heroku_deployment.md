# Heroku Deployment

In this assignment, you'll deploy your RESTful, database-driven, HTTP server to Heroku.

## Pre-deployment

Remember to generate a secret key that'll be used to sign session information on the production environment.

```shell
bash -c 'heroku config:set SESSION_SECRET=$(openssl rand -hex 64)'
```

Deploy the code to Heroku. More specifically, the deployment should:

- Create a Heroku app called `USERNAME-galvanize-bookshelf` where `USERNAME` is your GitHub username in lowercase.
- Update the `package.json` file with the version of Node from your development environment.
- Enable the Heroku PostgreSQL add-on for your new Heroku app.
- Update the `knexfile.js` file with the `production` database connection information.
- Update the `package.json` file with a `heroku-postbuild` script to migrate the production database.
- Add and commit the changes to your local git repository.
- Push the changes to the master branch of your Heroku remote.
- Seed the production database by running a one-off command on Heroku.
- After about one minute, check that the production database has the correct number of tables and rows.

## Post-deployment

Once your application is deployed, add its URL to your Github repository.

![How to set a Github URL](images/github_url.png)
