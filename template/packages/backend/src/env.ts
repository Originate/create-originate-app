import { IsIn, IsOptional, IsPort, IsUrl } from "class-validator"

export class Env {
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: false,
    require_tld: false,
  })
  DATABASE_URL!: string

  @IsIn(["development", "production", "testing"])
  NODE_ENV!: string

  @IsPort()
  @IsOptional()
  PORT: string = "3000"
}
