import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { startPostgresContainer } from "docker-await-postgres"
import request from "supertest"
import { createConnection } from "typeorm"

jest.setTimeout(15_000)

async function getTestDatabase(): Promise<{
  stop: () => Promise<void>
}> {
  const config = {
    user: "postgres",
    password: "password",
    database: "postgres",
    image: "postgres:latest",
  }
  const { port, stop } = await startPostgresContainer(config)
  process.env.DATABASE_URL = `postgres://${config.user}:${config.password}@localhost:${port}/${config.database}`

  const conn = await createConnection()
  await conn.runMigrations()
  await conn.close()

  return { stop }
}

describe("Recipes example (e2e)", () => {
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

  it("gets a list of recipes", () => {
    return request(app.getHttpServer())
      .get("/graphql")
      .query({
        query: gql`
          query {
            recipes {
              id
            }
          }
        `,
      })
      .expect(200)
      .expect({ data: { recipes: [] } })
  })
})

function gql(query: TemplateStringsArray): string {
  return query.join("\n")
}
