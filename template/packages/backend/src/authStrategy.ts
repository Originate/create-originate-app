import { Env } from "@/backend/src/env"
import { User, UserSignup } from "@/lib"
import * as D from "io-ts/lib/Decoder"
import { Connection } from "typeorm"
import { Auth } from "./entity/Auth"

export class AuthStrategy {
  constructor(_env: Env, private db: Connection) {}

  signupDecoder: D.Decoder<unknown, UserSignup> = D.type({
    name: D.string,
    email: D.string,
  })

  async createUser(
    user: UserSignup,
    passwordDigest: Buffer,
  ): Promise<
    { ok: true; id: string } | { ok: false; key: string; error: string }
  > {
    const answer = await this.db
      .createQueryBuilder()
      .insert()
      .into(Auth)
      .values([{ id: user.email, passwordDigest: passwordDigest }])
      .onConflict("(id) DO NOTHING")
      .execute()
    if (answer.raw.rowCount === 0) {
      return {
        ok: false,
        key: "duplicate",
        error: "User with this email already exists",
      }
    } else {
      return { ok: true, id: user.email }
    }
  }

  async authenticate(
    id: string,
  ): Promise<
    | { ok: true; passwordDigest: Buffer; user: User }
    | { ok: false; key: string; error: string }
  > {
    const auth = await this.db.getRepository(Auth).findOne(id)
    if (auth) {
      return {
        ok: true,
        passwordDigest: auth.passwordDigest,
        user: {
          email: auth.id,
          name: "fixme",
          occupation: "fixme",
        },
      }
    } else {
      return {
        ok: false,
        key: "unauthorized",
        error: "Incorrect username or password",
      }
    }
  }
}
