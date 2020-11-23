import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { NewIngredientInput } from "../dto/new-ingredient.input"
import { Ingredient } from "../models/ingredient.entity"

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient) private repository: Repository<Ingredient>,
  ) {}

  create(ingredient: NewIngredientInput): Promise<Ingredient> {
    return this.repository.save(ingredient)
  }
}
