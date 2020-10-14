import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Auth {
  @PrimaryColumn({ type: "text" })
  id!: string

  @Column({ default: () => "CURRENT_TIMESTAMP", update: false })
  createdAt!: Date

  @Column({ name: "password_digest", type: "bytea" })
  passwordDigest!: Buffer
}
