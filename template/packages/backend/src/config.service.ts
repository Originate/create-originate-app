import { Injectable } from "@nestjs/common"
import { transformAndValidateSync } from "class-transformer-validator"
import { ValidationError } from "class-validator"
import { config } from "dotenv"
import { parse } from "url"
import { Env } from "./env"

@Injectable()
export class ConfigService {
  env: Env

  constructor() {
    config()
    try {
      // `transformAndValidateSync` automatically checks its input object (`env`)
      // for required properties and applies validations based on the properties
      // and annotations in the reference class (`Env`).
      this.env = transformAndValidateSync(Env, process.env)
    } catch (error) {
      // Format validation errors nicely
      if (Array.isArray(error)) {
        console.error(
          error
            .map(e =>
              e instanceof ValidationError && e.constraints
                ? Object.values(e.constraints).join("\n")
                : e.toString(),
            )
            .join("\n"),
        )
        process.exit(1)
      } else {
        throw error
      }
    }
  }

  get isDev(): boolean {
    return this.env.NODE_ENV === "development"
  }

  /**
   * Checks that `NODE_ENV == "development"`, and adds an extra sanity check
   * that `DATABASE_URL` is local to avoid synchronizing schema to a production
   * database.
   */
  get isDevDatabase(): boolean {
    const db = parse(this.env.DATABASE_URL)
    return this.isDev && db.hostname === "localhost"
  }
}
