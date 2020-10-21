import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Auth {
  @PrimaryColumn({ type: "text" })
  id!: string

  @CreateDateColumn()
  createdAt!: Date

  @Column({ name: "password_digest", type: "bytea" })
  passwordDigest!: Buffer
}
