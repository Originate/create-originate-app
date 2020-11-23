import { Repository } from "typeorm";
import { NewIngredientInput } from "../dto/new-ingredient.input";
import { Ingredient } from "../models/ingredient.entity";
export declare class IngredientService {
    private repository;
    constructor(repository: Repository<Ingredient>);
    create(ingredient: NewIngredientInput): Promise<Ingredient>;
}
//# sourceMappingURL=ingredient.service.d.ts.map