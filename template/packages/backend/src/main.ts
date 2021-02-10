import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "./config.service"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  app.enableCors({ credentials: true })
  await app.listen(config.env.PORT)
}
bootstrap()
