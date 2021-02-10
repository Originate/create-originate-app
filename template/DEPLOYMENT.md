# Deployment

Set `HEROKU_FRONTEND_NAME` and `HEROKU_BACKEND_NAME` in `deploy.sh`

Create .env.production in `package.frontend` and assign `NEXT_PUBLIC_GRAPHQL_URL` to the location of the production
backend. 
`NEXT_PUBLIC_GRAPHQL_URL=https://<heroku-backend-name>.herokuapp.com/graphql`



