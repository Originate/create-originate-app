import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRecipes1603481609791 implements MigrationInterface {
    name = 'AddRecipes1603481609791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "ingredient_category_enum" AS ENUM('dairy', 'fruit', 'meat', 'nut', 'vegetable')`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category" "ingredient_category_enum" NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_6e193bb10a2cd8a65929edf7d07" PRIMARY KEY ("recipeId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce"`);
        await queryRunner.query(`DROP INDEX "IDX_d2bbcf7bab477bfdcec65465c0"`);
        await queryRunner.query(`DROP INDEX "IDX_b67e81a9afa83f2ee13440175c"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients_ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TYPE "ingredient_category_enum"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
