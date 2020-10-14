// TypeORM generates migration by diffing configuration in entity classes
// against the current database schema. If the developer has been fiddling with
// their dev database - especially if they have been using TypeORM's `sync`
// option - the dev database schema might be out-of-sync with what you would get
// by running migrations from scratch.
//
// This script spins up a fresh database in a temporary docker container, runs
// migrations, and generates a migration off of the resulting schema.

import { startPostgresContainer } from "docker-await-postgres"
import { spawn, ChildProcessByStdio } from "child_process"

const processArgs = process.argv.slice(2)

const config = {
  user: "postgres",
  password: "password",
  database: "postgres",
  image: "postgres:latest",
}

let stopDatabase: () => Promise<void> | undefined

// Waits for a child process to exit, and resolves with its exit status.
function onExit(
  childProcess: ChildProcessByStdio<null, null, null>,
): Promise<number> {
  return new Promise((resolve, reject) => {
    childProcess.on("close", resolve)
    childProcess.on("error", reject)
  })
}

async function typeorm(
  dbUrl: string,
  subcommand: string,
  args: string[] = [],
): Promise<void> {
  const childProcess = spawn("yarn", ["typeorm", subcommand].concat(args), {
    env: { DATABASE_URL: dbUrl },
    stdio: [process.stdin, process.stdout, process.stderr],
  })
  const status = await onExit(childProcess)
  if (status !== 0) {
    throw new Error(
      `TypeORM command ${subcommand} failed. Exit status: ${status}`,
    )
  }
}

async function runMigrations(dbUrl: string): Promise<void> {
  return typeorm(dbUrl, "migration:run")
}

async function generateMigration(dbUrl: string, args: string[]): Promise<void> {
  return typeorm(dbUrl, "migration:generate", args)
}

async function cleanUp() {
  if (stopDatabase) {
    await stopDatabase()
  }
}

async function main() {
  try {
    const { port, stop } = await startPostgresContainer(config)
    stopDatabase = stop
    const dbUrl = `postgres://${config.user}:${config.password}@localhost:${port}/${config.database}`
    await runMigrations(dbUrl)
    await generateMigration(dbUrl, processArgs)
  } catch (err) {
    console.error(err)
  } finally {
    await cleanUp()
  }
}

// Shut down temporary database if this script is terminated early.
process.once("SIGINT", () => cleanUp)
process.once("SIGTERM", () => cleanUp)

main()
