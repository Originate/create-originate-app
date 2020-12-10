import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Ingredient } from "./ingredient.entity"

@ObjectType()
@Entity()
export class Recipe {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @CreateDateColumn()
  createdAt!: Date

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date

  @Field()
  @Column()
  title!: string

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  description?: string

  @ManyToMany(
    _type => Ingredient,
    ingredient => ingredient.recipes,
  )
  @JoinTable()
  ingredients?: Ingredient[]
}

