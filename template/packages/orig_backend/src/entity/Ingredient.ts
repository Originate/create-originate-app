import { MaxLength } from "class-validator"
import { Field, ID, ObjectType } from "type-graphql"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Recipe } from "./Recipe"

export enum IngredientCategory {
  DAIRY = "dairy",
  FRUIT = "fruit",
  MEAT = "meat",
  NUT = "nut",
  VEGETABLE = "vegetable",
}

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
