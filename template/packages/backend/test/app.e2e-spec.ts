import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { getTestDatabase, gql, graphqlRequest } from "originate-scripts"

jest.setTimeout(15_000)

describe("Recipes example (e2e)", () => {
  let app: INestApplication
  let stopDatabase: () => Promise<void> | undefined

  beforeAll(async () => {
    const { stop } = await getTestDatabase()
    stopDatabase = stop

    // Import app module dynamically *after* we set environment variables.
    // (`getTestDatabase` implicitly sets `DATABASE_URL`.)
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
    expect(
      await graphqlRequest(app, {
        query: gql`
          query genericQuery {
            __schema {
              types {
                name
              }
            }
          }
        `,
      }),
    ).toMatchObject({
      data: { __schema: { types: expect.any(Array) } },
    })
  })
})
