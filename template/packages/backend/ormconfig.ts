// TypeORM sources this file automatically when a database connection is created
// in the app, and when running TypeORM CLI commands.

import dotenv from "dotenv"
dotenv.config()

const dbUrl = process.env.DATABASE_URL

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

    entities: ["src/**/*.entity.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/**/*.subscriber.ts"],

    ssl: { require: true, rejectUnauthorized: false },

    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
]
