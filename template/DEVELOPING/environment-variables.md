# Environment Variables

We use
[@nest/env](https://github.com/vercel/next.js/blob/master/docs/basic-features/environment-variables.md#loading-environment-variables)
to load environment variables from `.env*` files in both the frontend and
backend packages. See the @nest/env readme for detailed documentation.

Briefly you can have multiple env files that are loaded depending
environment.

- `.env` - always loaded
- `.env.local` - always loaded, any variables here override values in `.env`
- `.env.development` - loaded in development mode (COA provides this one)
- `.env.development.local` - loaded in development, any variables here override
  values in `.env.development`
- `.env.test`, `.env.production` - loaded in test or production modes; and you
  can provide `.env*.local` versions too

The reason for `.env*.local` files is so that you can have variables checked
into version control that can be overridden by `.local` files that are not in
version control.
