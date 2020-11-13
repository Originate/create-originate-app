import { ContextIdFactory } from "@nestjs/core"
import { Test, TestingModule } from "@nestjs/testing"
import { Recipe } from "./models/recipe.entity"
import { RecipeResolver } from "./recipe.resolver"
import { RecipeService } from "./recipe.service"

// Mock the service class so that we don't have to provide its dependencies.
jest.mock("./recipe.service")

describe("RecipeResolver", () => {
  let resolver: RecipeResolver
  let service: RecipeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeResolver, RecipeService],
    }).compile()

    // Set up a context ID for request-scoped providers so we can get at
    // a resolver instance, and its matching service instance.
    const contextId = ContextIdFactory.create()
    jest.spyOn(ContextIdFactory, "getByRequest").mockReturnValue(contextId)

    resolver = await module.resolve(RecipeResolver, contextId)
    service = await module.resolve(RecipeService, contextId)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("provides a list of recipes", async () => {
    const recipes: Recipe[] = [
      {
        id: 1,
        title: "Yummy Cookies",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    jest.spyOn(service, "find").mockImplementation(async args => {
      expect(args).toEqual({ skip: 0, take: 25 })
      return recipes
    })

    expect(await resolver.recipes({ skip: 0, take: 25 })).toEqual(recipes)
  })
})
