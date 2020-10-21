import { Field, ID, InputType } from "@nestjs/graphql"
import { IsOptional, MaxLength } from "class-validator"

@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title!: string

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description?: string

  @Field(_type => [ID], { nullable: true })
  ingredientIDs?: string[]
}
