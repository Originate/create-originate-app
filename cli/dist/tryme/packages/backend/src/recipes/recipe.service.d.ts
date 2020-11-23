import { EntityManager, Repository } from "typeorm";
import { GetRecipesArgs } from "./dto/get-recipes.args";
import { NewRecipeInput } from "./dto/new-recipe.input";
import { Recipe } from "./models/recipe.entity";
export declare class RecipeService {
    private manager;
    private recipeRepository;
    constructor(manager: EntityManager, recipeRepository: Repository<Recipe>);
    ingredientsLoader: any;
    findById(id: string): Promise<Recipe | undefined>;
    find({ title, userId, skip, take }: GetRecipesArgs): Promise<Recipe[]>;
    findByUserId(userId: string): Promise<Recipe[]>;
    create(recipe: NewRecipeInput): Promise<Recipe>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=recipe.service.d.ts.map