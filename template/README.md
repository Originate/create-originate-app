# @replaceme

The create-originate-app framework consists of two sub-packages which each run a server. There is
a **backend** API server, and a **frontend** server that serves React code.

## Documentation

[Developing Documentation](./DEVELOPING/index.md)

## Getting started

### Install Dependencies

Install Docker, and make sure it is running. See https://docs.docker.com/get-docker/

Install application dependencies by running: `yarn`

### Frontend

Start the Frontend Nextjs server: `yarn dev:frontend`

### Backend

Setup your backend ENV. This will be handled more gracefully in the future.

`cp packages/backend/.env.example packages/backend/.env`

Start the Backend Nest server: `yarn dev:backend`

(If you've previously used create-originate-app to create a application with the same name, you'll need to remove the database docker container from the previous run)

You can access your application as follows: 
  Frontend: http://localhost:@frontendPort
  Backend: http://localhost:@backendPort 
  GraphQL playground: http://localhost:@backendPort/graphql 
  Database: http://localhost:@dbPort
