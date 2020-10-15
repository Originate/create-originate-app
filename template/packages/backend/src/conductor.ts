import * as Auth from "@/auth"
import { User, UserSignup } from "@/lib"
import { Connection, getConnection } from "typeorm"
import { CryptoService } from "../lib/crypto"
import { App } from "./app"
import { AuthStrategy } from "./authStrategy"
import { parseEnv } from "./env"
import { makeExpress } from "./utils"

function makeEnv() {
  const env = parseEnv()
  if (typeof env == "string") {
    console.error("missing or invalid keys in ENV")
    console.error("==============================")
    console.error("")
    console.error(env)
    console.error("")
    console.error("unsolicited advice: check your packages/backend/.env file")
    process.exit(1)
  }
  return env
}

export class Conductor {
  env = makeEnv()
  db: Connection
  cryptoService = new CryptoService()
  authStrategy: AuthStrategy
  authController: Auth.AuthController<UserSignup, User>

  static async initialize(): Promise<Conductor> {
    return new Conductor(getConnection())
  }

  constructor(db: Connection) {
    this.db = db
    this.authStrategy = new AuthStrategy(this.env, db)
    this.authController = new Auth.AuthController(
      this.authStrategy,
      this.cryptoService,
    )
  }

  async listen() {
    await this._testDB()
    const express = makeExpress(this.env, express => {
      new App(this.env, express, this.authController)
    })
    express.listen(this.env.PORT, () => {
      console.log(`backend: started at http://localhost:${this.env.PORT}`)
    })
  }

  async _testDB() {
    const url =
      "https://github.com/Originate/create-originate-app/blob/master/docs/persistence.md"
    try {
      await this.db.query("SELECT 1234")
    } catch (e) {
      if (e.code == "ECONNREFUSED") {
        console.error(`>>> unable to connect to ${this.env.DATABASE_URL} <<<`)
        console.error(`see ${url} for help`)
        process.exit(1)
      } else {
        throw e
      }
    }
  }
}
