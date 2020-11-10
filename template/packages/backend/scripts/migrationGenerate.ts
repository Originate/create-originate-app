// TypeORM generates migration by diffing configuration in entity classes
// against the current database schema. If the developer has been fiddling with
// their dev database - especially if they have been using TypeORM's `sync`
// option - the dev database schema might be out-of-sync with what you would get
// by running migrations from scratch.
//
// This script spins up a fresh database in a temporary docker container, runs
// migrations, and generates a migration off of the resulting schema.

// TODO: move to @originate/scripts

import { startPostgresContainer } from "@originate/docker-await-postgres"
import { ChildProcessByStdio, spawn } from "child_process"

const processArgs = process.argv.slice(2)

const config = {
  user: "postgres",
  password: "password",
  database: "postgres",
  image: "postgres:latest",
}

let stopDatabase: () => Promise<void> | undefined

class ProcessError extends Error {
  constructor(public exitStatus: number) {
    super(`process exited with status: ${exitStatus}`)
  }
}

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
  process.env.DATABASE_URL = dbUrl;
  const childProcess = spawn("yarn", ["typeorm", subcommand].concat(args), {
    env: { DATABASE_URL: dbUrl, ...process.env },
    stdio: [process.stdin, process.stdout, process.stderr],
  })
  const status = await onExit(childProcess)
  if (status !== 0) {
    throw new ProcessError(status)
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

    console.log("\n# Running existing migrations in temporary database")
    await runMigrations(dbUrl)

    console.log("\n# Generating new migration")
    await generateMigration(dbUrl, processArgs)

    await cleanUp()
  } catch (err) {
    await cleanUp()
    process.exit(err instanceof ProcessError ? err.exitStatus : 1)
  }
}

// Shut down temporary database if this script is terminated early.
process.once("SIGINT", () => cleanUp)
process.once("SIGTERM", () => cleanUp)

main()
