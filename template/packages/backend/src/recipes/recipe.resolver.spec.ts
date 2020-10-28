import { Test, TestingModule } from "@nestjs/testing"
import { getEntityManagerToken, getRepositoryToken } from "@nestjs/typeorm"
import { Recipe } from "./models/recipe.entity"
import { RecipeResolver } from "./recipe.resolver"
import { RecipeService } from "./recipe.service"

describe("RecipeResolver", () => {
  let resolver: RecipeResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeResolver,
        RecipeService,
        {
          provide: getEntityManagerToken(),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Recipe),
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<RecipeResolver>(RecipeResolver)
  })

  it("should be defined", () => {
    expect(resolver).toBeDefined()
  })

  it("should provide a list of recipes", async () => {
    expect(resolver.recipes({ skip: 0, take: 25 })).toEqual({
      data: { recipes: [] },
    })
  })
})
