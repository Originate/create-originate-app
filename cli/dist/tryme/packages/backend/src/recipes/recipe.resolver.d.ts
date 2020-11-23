import { GetRecipesArgs } from "./dto/get-recipes.args";
import { NewRecipeInput } from "./dto/new-recipe.input";
import { Ingredient } from "./models/ingredient.entity";
import { Recipe } from "./models/recipe.entity";
import { RecipeService } from "./recipe.service";
export declare class RecipeResolver {
    private recipeService;
    constructor(recipeService: RecipeService);
    recipe(id: string): Promise<Recipe>;
    recipes(args: GetRecipesArgs): Promise<Recipe[]>;
    addRecipe(recipe: NewRecipeInput): Promise<Recipe>;
    deleteRecipe(id: string): Promise<boolean>;
    ingredients(recipe: Recipe): Promise<Ingredient[]>;
}
//# sourceMappingURL=recipe.resolver.d.ts.map