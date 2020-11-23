import { ContextIdFactory } from "@nestjs/core"
import { Test, TestingModule } from "@nestjs/testing"
import { Ingredient, IngredientCategory } from "../models/ingredient.entity"
import { IngredientResolver } from "./ingredient.resolver"
import { IngredientService } from "./ingredient.service"

// Mock the service class so that we don't have to provide its dependencies.
jest.mock("./ingredient.service")

describe("IngredientResolver", () => {
  let resolver: IngredientResolver
  let service: IngredientService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientResolver, IngredientService],
    }).compile()

    // Set up a context ID for request-scoped providers so we can get at
    // a resolver instance, and its matching service instance.
    const contextId = ContextIdFactory.create()
    jest.spyOn(ContextIdFactory, "getByRequest").mockReturnValue(contextId)

    resolver = await module.resolve(IngredientResolver, contextId)
    service = await module.resolve(IngredientService, contextId)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("saves a new ingredient", async () => {
    const ingredient: Ingredient = {
      id: 1,
      name: "raisins",
      category: IngredientCategory.FRUIT,
    }

    jest.spyOn(service, "create").mockImplementation(async ingredientInput => {
      expect(ingredientInput).toEqual({
        name: "raisins",
        category: IngredientCategory.FRUIT,
      })
      return ingredient
    })

    expect(
      await resolver.addIngredient({
        name: "raisins",
        category: IngredientCategory.FRUIT,
      }),
    ).toEqual(ingredient)
  })
})
