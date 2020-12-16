import { run } from "../src/app"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
// import tmp from "tmp"

// Running yarn on the project takes some time
jest.setTimeout(30000)

const appName = "tryme"
const frontendPort = "123"
const backendPort = "456"
const dbPort = "789"

const testArgs = [
  "test",
  "test",
  appName,
  "-f",
  frontendPort.toString(),
  "-b",
  backendPort,
  "-d",
  dbPort,
]

describe("cli_e2e", () => {
  beforeAll(async () => {
    await run(testArgs)
  })
  test("frontend package.json", async () => {
    const filename = path.join(
      path.resolve(appName),
      `/packages/frontend/package.json`,
    )
    let json = JSON.parse(fs.readFileSync(filename, "utf8"))
    expect(json.name).toBe(`@${appName}/frontend`)
    expect(json.scripts["start:dev"]).toBe(
      `concurrently -k 'next dev -p ${frontendPort}' 'yarn codegen:watch'`,
    )
  })
  test("backend package.json", async () => {
    const filename = path.join(
      path.resolve(appName),
      `/packages/backend/package.json`,
    )
    let json = JSON.parse(fs.readFileSync(filename, "utf8"))
    expect(json.name).toBe(`@${appName}/backend`)
    expect(json.scripts["db:start"]).toBe(
      `docker start ${appName}-postgres 2>/dev/null || docker run -e POSTGRES_PASSWORD=password -p ${dbPort}:5432 -d --name ${appName}-postgres postgres:latest`,
    )
    expect(json.scripts["db:stop"]).toBe(`docker stop ${appName}-postgres`)
    expect(json.scripts["db:destroy"]).toBe(
      `yarn db:stop >/dev/null && docker rm ${appName}-postgres`,
    )
    expect(json.scripts["db:shell"]).toBe(
      `docker exec -it ${appName}-postgres psql -U postgres`,
    )
  })

  test("frontend .env", async () => {
    const filename = path.join(
      path.resolve(appName),
      `/packages/frontend/.env.development`,
    )
    const env = dotenv.parse(fs.readFileSync(filename, "utf8"))
    expect(env.NEXT_PUBLIC_GRAPHQL_URL).toBe(
      `http://localhost:${backendPort}/graphql`,
    )
  })

  test("backend .env", async () => {
    const filename = path.join(
      path.resolve(appName),
      `/packages/backend/.env.development`,
    )
    const env = dotenv.parse(fs.readFileSync(filename, "utf8"))
    expect(env.PORT).toBe(backendPort)
  })
})
