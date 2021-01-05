# Environment Variables

## Reading Environment Variables

All of the environment variables that the app reads are declared in
[backend/src/env.ts][env]. We use [class-validator][] to specify whether each
variable is required, to provide default values, and to specify any additional
validation. For example,

[env]: ../packages/backend/src/env.ts
[class-validator]: https://github.com/typestack/class-validator#readme

```ts
export class Env {
  // built-in validator checks that the variable is formatted as a URL
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: false,
    require_tld: false,
  })
  DATABASE_URL!: string
  // ^ no `@IsOptional()` means this one is required

  @IsPort() // built-in validator checks value is a number from 0-65535
  @IsOptional() // this variable is optional
  PORT = "3000" // default value
}
```

> ℹ️ We know that required variables in `Env` will be set thanks to validation
> from class-validator. TypeScript doesn't know that, so we put an `!` after
> class property names to assert non-nullability.

If you want to introduce a new environment variable please add it to `Env` -
avoid reading directly from `process.env`. That way we can look in one place to
see all of the environment variables that the app uses.

There is one instance of `Env` which is created by [ConfigService][]. And in
turn ConfigService is initialized in [AppModule][].

[configservice]: ../packages/backend/src/config.service.ts
[appmodule]: ../packages/backend/src/app.module.ts

## Providing Environment Variables

We use [@next/env][] to load environment variables from `.env*` files in both
the frontend and backend packages. It's essentially a powered-up alternative to
`dotenv`. See the link for detailed documentation.

[@next/env]: https://nextjs.org/docs/basic-features/environment-variables

Briefly you can have multiple env files that are loaded depending on the
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

In development and testing you probably want to use `.env` files, keeping
private settings in `.env.*.local` files. In production you can use
`.env.production`, or you can set variables by other means.

Another feature of @next/env is the ability to interpolate variables. For
example,

```
# .env.development
HOSTNAME=localhost
PORT=8080
HOST=http://$HOSTNAME:$PORT
```
