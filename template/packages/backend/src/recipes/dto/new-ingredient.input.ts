import { Field, InputType } from "@nestjs/graphql"
import { MaxLength } from "class-validator"
import { IngredientCategory } from "../models/ingredient.entity"

@InputType()
export class NewIngredientInput {
  @Field()
  @MaxLength(30)
  name!: string

  @Field(_type => IngredientCategory)
  category!: IngredientCategory
}
