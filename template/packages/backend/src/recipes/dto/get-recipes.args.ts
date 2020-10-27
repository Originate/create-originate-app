import { ArgsType, Field, ID, Int } from "@nestjs/graphql"
import { Max, Min } from "class-validator"

@ArgsType()
export class GetRecipesArgs {
  @Field(_type => Int)
  @Min(0)
  skip = 0

  @Field(_type => Int)
  @Min(1)
  @Max(50)
  take = 25

  @Field({ nullable: true })
  title?: string

  @Field(_type => ID, { nullable: true })
  userId?: string
}
