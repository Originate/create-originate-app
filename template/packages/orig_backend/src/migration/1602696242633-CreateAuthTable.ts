import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAuthTable1602696242633 implements MigrationInterface {
  name = "CreateAuthTable1602696242633"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "password_digest" bytea NOT NULL, CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth"`)
  }
}
