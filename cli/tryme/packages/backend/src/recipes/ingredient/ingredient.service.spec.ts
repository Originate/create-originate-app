import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Ingredient, IngredientCategory } from "../models/ingredient.entity"
import { IngredientService } from "./ingredient.service"

describe("IngredientService", () => {
  let service: IngredientService
  const repository = {
    save: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        {
          provide: getRepositoryToken(Ingredient),
          useValue: repository,
        },
      ],
    }).compile()

    service = await module.resolve<IngredientService>(IngredientService)
  })

  it("saves a new ingredient", async () => {
    const ingredient: Ingredient = {
      id: 1,
      name: "raisins",
      category: IngredientCategory.FRUIT,
    }

    repository.save.mockImplementation(async ingredientInput => {
      expect(ingredientInput).toEqual({
        name: "raisins",
        category: IngredientCategory.FRUIT,
      })
      return ingredient
    })

    expect(
      await service.create({
        name: "raisins",
        category: IngredientCategory.FRUIT,
      }),
    ).toEqual(ingredient)
  })
})
