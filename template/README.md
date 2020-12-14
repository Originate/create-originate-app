# @replaceme

The create-originate-app framework consists of two sub-packages which each run a server. There is
a **backend** API server, and a **frontend** server that serves React code.

## Documentation

[Developing Documentation](./DEVELOPING/index.md)

## Getting started

### Install Dependencies

Install Docker, and make sure it is running. See https://docs.docker.com/get-docker/

### Install
create-originate-app has already run `yarn` in this directory. 

### Frontend

Start the Frontend Nextjs server: `yarn dev:frontend`

### Backend

Start the Backend Nest server: `yarn dev:backend`

### Environment Variables

Using [@nest/env](https://github.com/vercel/next.js/blob/7e387f0fce09b77f1cf2a777e2b5fbed874fbec0/docs/basic-features/environment-variables.md#loading-environment-variables) for both front and backend.

(If you've previously used create-originate-app to create a application with the same name, you'll need to remove the database docker container from the previous run)

You can access your application as follows: 
  Frontend: http://localhost:@frontendPort
  Backend: http://localhost:@backendPort 
  GraphQL playground: http://localhost:@backendPort/graphql 
  Database: postgres://postgres:password@localhost:@dbPort/postgres
