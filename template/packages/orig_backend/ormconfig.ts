// TypeORM sources this file automatically when a database connection is created
// in the app, and when running TypeORM CLI commands.

import dotenv from "dotenv"
dotenv.config()

const dbUrl = process.env.DATABASE_URL
const isDev = process.env.NODE_ENV === "development"

if (!dbUrl) {
  throw new Error(
    "You must configure a database via the DATABASE_URL environment variable.",
  )
}

export = [
  // Default connection
  {
    type: "postgres",
    url: dbUrl,

    // In dev mode only, automatically updates database schema on app start to
    // match entity classes in `src/entity/**/*.ts`. After updating entities
    // (whether or not the database schema has been synced) you can generate
    // a migration automatically by running
    // 
    //     $ yarn db:migration:generate -n NameOfMigrationModule
    //
    synchronize: isDev,

    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],

    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
]
