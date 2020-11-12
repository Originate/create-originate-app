import { Test, TestingModule } from "@nestjs/testing"
import { getEntityManagerToken, getRepositoryToken } from "@nestjs/typeorm"
import { Recipe } from "./models/recipe.entity"
import { RecipeResolver } from "./recipe.resolver"
import { RecipeService } from "./recipe.service"

describe("RecipeResolver", () => {
  let resolver: RecipeResolver
  const entityManager = {
    find: jest.fn(),
  }
  const repository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeResolver,
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

    resolver = await module.resolve<RecipeResolver>(RecipeResolver)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("should be defined", () => {
    expect(resolver).toBeDefined()
  })

  it("should provide a list of recipes", async () => {
    entityManager.find.mockImplementation(async (classRef, params) => {
      expect(classRef).toBe(Recipe)
      expect(params).toMatchObject({ skip: 0, take: 25 })
      return { data: { recipes: [] } }
    })
    expect(await resolver.recipes({ skip: 0, take: 25 })).toEqual({
      data: { recipes: [] },
    })
  })
})
