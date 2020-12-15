import { IsIn, IsOptional, IsPort, IsUrl } from "class-validator"

export class Env {
  /**
   * CI environments usually set `CI=true`
   */
  @IsOptional()
  CI: string | undefined

  @IsUrl({
    require_protocol: true,
    require_valid_protocol: false,
    require_tld: false,
  })
  DATABASE_URL!: string

  @IsPort()
  @IsOptional()
  PORT = "3000"
}
