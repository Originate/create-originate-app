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

  it("creates a recipe", async () => {
    expect(
      await graphqlRequest(app, {
        query: gql`
          mutation addRecipe($recipe: NewRecipeInput!) {
            addRecipe(recipe: $recipe) {
              id
            }
          }
        `,
        variables: {
          recipe: {
            description: "my description",
            ingredientIDs: [],
            title: "my title",
          },
        },
      }),
    ).toEqual({
      data: { addRecipe: { id: expect.any(String) } },
    })
  })

  it("gets a list of recipes", async () => {
    expect(
      await graphqlRequest(app, {
        query: gql`
          query {
            recipes {
              id
              title
              description
            }
          }
        `,
      }),
    ).toEqual({
      data: {
        recipes: [
          {
            id: expect.any(String),
            title: "my title",
            description: "my description",
          },
        ],
      },
    })
  })

  it("deletes a recipe", async () => {
    expect(
      await graphqlRequest(app, {
        query: gql`
          mutation {
            deleteRecipe(id: 1)
          }
        `,
      }),
    ).toEqual({
      data: { deleteRecipe: true },
    })
  })

  it("reports failure when deleting a recipe that does not exist", async () => {
    const id = "99"
    expect(
      await graphqlRequest(app, {
        query: gql`
          mutation deleteRecipe($id: ID!) {
            deleteRecipe(id: $id)
          }
        `,
        variables: { id },
      }),
    ).toEqual({
      data: null,
      errors: [
        expect.objectContaining({
          extensions: expect.objectContaining({
            code: "BAD_USER_INPUT",
            id,
          }),
          message: `Could not find recipe with ID ${id}`,
        }),
      ],
    })
  })

  it("creates an ingredient", async () => {
    expect(
      await graphqlRequest(app, {
        query: gql`
          mutation addIngredient($ingredient: NewIngredientInput!) {
            addIngredient(ingredient: $ingredient) {
              id
            }
          }
        `,
        variables: {
          ingredient: {
            category: "FRUIT",
            name: "my name",
          },
        },
      }),
    ).toEqual({
      data: { addIngredient: { id: expect.any(String) } },
    })
  })
})
