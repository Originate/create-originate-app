import { MaxLength } from "class-validator"
import { Field, ID, ObjectType } from "type-graphql"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Ingredient } from "./Ingredient"
import { User } from "./User"

@ObjectType()
@Entity()
export class Recipe {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @MaxLength(30)
  @Column()
  title!: string

  @Field({ nullable: true })
  @MaxLength(255)
  @Column({ nullable: true, type: "text" })
  description?: string

  @ManyToOne(_type => User, { nullable: false, onDelete: "CASCADE" })
  user?: User

  @Field({ description: "is this recipe shared publicly?" })
  @Column()
  isPublic!: boolean

  @Field()
  @CreateDateColumn()
  createdAt!: Date

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToMany(_type => Ingredient, ingredient => ingredient.recipes)
  @JoinTable()
  ingredients?: Ingredient[]
}
