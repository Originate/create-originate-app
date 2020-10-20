import { IsOptional, MaxLength } from "class-validator"
import { Field, ID, InputType } from "type-graphql"

@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title!: string

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description?: string

  @Field()
  isPublic!: boolean

  @Field(_type => [ID])
  ingredientIDs!: string[]
}
