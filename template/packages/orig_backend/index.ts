import dotenv from "dotenv"
import "reflect-metadata" // required for TypeORM and TypeGraphQL annotations
import { initializeDatabase } from "./src/db"
import { parseEnv } from "./src/env"
import { initializeServer } from "./src/server"
import { initializeSchema } from "./src/graphqlSchema"

function makeEnv() {
  const env = parseEnv()
  if (typeof env == "string") {
    console.error("missing or invalid keys in ENV")
    console.error("==============================")
    console.error("")
    console.error(env)
    console.error("")
    console.error("unsolicited advice: check your packages/backend/.env file")
    process.exit(1)
  }
  return env
}

async function main() {
  process.on("unhandledRejection", err => {
    console.error(err)
    process.exit(1)
  })

  dotenv.config()
  const env = makeEnv()
  await initializeDatabase()
  const schema = await initializeSchema()
  await initializeServer(env, schema)
}

main().catch(e => {
  throw e
})
