import { Module } from "@nestjs/common"
import { RecipeResolver } from "./recipe/recipe.resolver"

@Module({
  providers: [RecipeResolver],
})
export class RecipesModule {}
