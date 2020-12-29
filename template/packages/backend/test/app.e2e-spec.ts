import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import {
  Config,
  startPostgresContainer,
} from "@originate/docker-await-postgres"
import request from "supertest"
import { createConnection } from "typeorm"

jest.setTimeout(15_000)

describe("Full api tests", () => {
  let app: INestApplication
  let stopDatabase: () => Promise<void> | undefined

  beforeAll(async () => {
    const { stop } = await getTestDatabase()
    stopDatabase = stop

    // Import app module dynamically *after* we set environment variables
    const { AppModule } = await import("../src/app.module")

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    if (stopDatabase) {
      await stopDatabase()
    }
  })

  // Write tests against your full API here. For examples see
  // recipes.e2e-spec.ts.

  it("serves an API", async () => {
    const result = await graphqlRequest(app, {
      query: gql`
        query genericQuery {
          __schema {
            types {
              name
            }
          }
        }
      `,
    })
    expect(result).toMatchObject({
      data: { __schema: { types: expect.any(Array) } },
    })
  })
})

// TODO: move to @originate/scripts
async function graphqlRequest(
  app: INestApplication,
  payload: { query: string; variables?: Record<string, unknown> },
) {
  const response = await request(app.getHttpServer())
    .post("/graphql")
    .send(payload)
    .expect(res => res.ok || console.error(res.body))
    .expect(200)
  return JSON.parse(response.text)
}

// TODO: move to @originate/scripts
function gql(query: TemplateStringsArray): string {
  return query.join("\n")
}

// TODO: move to @originate/scripts
async function getTestDatabase(): Promise<{
  stop: () => Promise<void>
}> {
  const config: Config = {
    user: "postgres",
    password: "password",
    database: "postgres",
    image: "postgres:latest",
    ensureShutdown: true,
  }
  const { port, stop } = await startPostgresContainer(config)
  process.env.DATABASE_URL = `postgres://${config.user}:${config.password}@localhost:${port}/${config.database}`

  const conn = await createConnection()
  await conn.runMigrations()
  await conn.close()

  return { stop }
}
