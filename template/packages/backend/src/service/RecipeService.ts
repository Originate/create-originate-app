import { Max, Min } from "class-validator"
import { ArgsType, Field, ID, Int } from "type-graphql"
import { getManager, Like } from "typeorm"
import { Recipe } from "../entity/Recipe"
import { User } from "../entity/User"

export class RecipeService {
  async findById(id: string): Promise<Recipe | undefined> {
    return getManager().findOne(Recipe, id)
  }

  async find({ title, userId, skip, take }: GetRecipesArgs): Promise<Recipe[]> {
    return getManager().find(Recipe, {
      where: {
        ...(userId ? { userId } : null),
        ...(title ? { title: Like(title) } : null),
      },
      skip,
      take,
      order: { title: "ASC", createdAt: "DESC" },
    })
  }

  async findByUserId(userId: string): Promise<Recipe[]> {
    return getManager().find(Recipe, {
      where: { userId },
      order: { title: "ASC", createdAt: "DESC" },
    })
  }

  async getOwners(recipeIds: string[]): Promise<User[]> {
    const users = await getManager()
      .createQueryBuilder(User, "user")
      .innerJoin("user.recipes", "recipe")
      .where("recipe.id IN (:...recipeIds)", { recipeIds })
      .orderBy({ email: "ASC", createdAt: "ASC" })
      .getMany()
    return users
  }
}

@ArgsType()
export class GetRecipesArgs {
  @Field(_type => Int, { defaultValue: 0 })
  @Min(0)
  skip!: number

  @Field(_type => Int)
  @Min(1)
  @Max(50)
  take = 25

  @Field({ nullable: true })
  title?: string

  @Field(_type => ID, { nullable: true })
  userId?: string
}
