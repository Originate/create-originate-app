import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { MaxLength } from "class-validator"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Recipe } from "./recipe.entity"

export enum IngredientCategory {
  DAIRY = "dairy",
  FRUIT = "fruit",
  MEAT = "meat",
  NUT = "nut",
  VEGETABLE = "vegetable",
}

registerEnumType(IngredientCategory, { name: "IngredientCategory" })

@ObjectType()
@Entity()
export class Ingredient {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @MaxLength(30)
  @Column()
  name!: string

  @Field(_type => IngredientCategory)
  @Column({ type: "enum", enum: IngredientCategory })
  category!: IngredientCategory

  @ManyToMany(_type => Recipe, recipe => recipe.ingredients)
  recipes?: Recipe[]
}
