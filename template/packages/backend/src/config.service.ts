import { Injectable } from "@nestjs/common"
import { transformAndValidateSync } from "class-transformer-validator"
import { ValidationError } from "class-validator"
import { parse } from "url"
import { Env } from "./env"
import { loadEnvConfig } from "@next/env"

@Injectable()
export class ConfigService {
  env: Env

  constructor() {
    try {
      // using @next/env to mirror frontend env handling.
      // https://github.com/vercel/next.js/blob/7e387f0fce09b77f1cf2a777e2b5fbed874fbec0/docs/basic-features/environment-variables.md#loading-environment-variables
      const env = loadEnvConfig("./", this.isDev).combinedEnv
      // `transformAndValidateSync` automatically checks its input object (`env`)
      // for required properties and applies validations based on the properties
      // and annotations in the reference class (`Env`).
      //
      this.env = transformAndValidateSync(Env, env)
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

  get isCi(): boolean {
    return !!this.env.CI
  }

  get isDev(): boolean {
    return (
      process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test"
    )
  }

  /**
   * Checks that `NODE_ENV !== "production" or "test"`, and adds an extra sanity check
   * that `DATABASE_URL` is local to avoid synchronizing schema to a production
   * database.
   */
  get isDevDatabase(): boolean {
    return this.isDev && this.isLocalDatabase
  }

  get isTest(): boolean {
    return this.env.NODE_ENV === "test"
  }

  get isLocalDatabase(): boolean {
    const db = parse(this.env.DATABASE_URL)
    return db.hostname === "localhost"
  }

  /**
   * This is `true` if we are running in test mode, but not in CI.
   */
  get isLocalTestDatabase(): boolean {
    return this.isLocalDatabase && this.isTest && !this.isCi
  }
}
