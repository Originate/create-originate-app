# Setup

You will need the [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

# Deploying

Set `HEROKU_FRONTEND_NAME` and `HEROKU_BACKEND_NAME` in `deploy.sh`
These need to be names that are globally unique to the heroku ecosystem

Create .env.production in `package.frontend` and assign `NEXT_PUBLIC_GRAPHQL_URL` to the location of the production backend. 
`NEXT_PUBLIC_GRAPHQL_URL=https://<heroku-backend-name>.herokuapp.com/graphql`

Run `./deploy.sh --setup` to create and prepare you heroku instances for deployment. 

And finally, run `./deploy.sh` to deploy your applications. 



