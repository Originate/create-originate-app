import { Test, TestingModule } from "@nestjs/testing"
import { getEntityManagerToken, getRepositoryToken } from "@nestjs/typeorm"
import { Recipe } from "./models/recipe.entity"
import { RecipeService } from "./recipe.service"

describe("RecipeService", () => {
  let service: RecipeService
  const entityManager = {
    find: jest.fn(),
  }
  const repository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getEntityManagerToken(),
          useValue: entityManager,
        },
        {
          provide: getRepositoryToken(Recipe),
          useValue: repository,
        },
      ],
    }).compile()

    service = await module.resolve<RecipeService>(RecipeService)
  })

  it("looks up a list of recipes", async () => {
    const recipes: Recipe[] = [
      {
        id: 1,
        title: "Yummy Cookies",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    entityManager.find.mockImplementation(async (entityType, params) => {
      expect(entityType).toBe(Recipe)
      expect(params).toMatchObject({ skip: 0, take: 25 })
      return recipes
    })

    expect(await service.find({ skip: 0, take: 25 })).toEqual(recipes)
  })
})
