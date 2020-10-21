import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { isDev } from "./env"
import { join } from "path"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "schema.graphql"),
      sortSchema: true,
      debug: isDev(),
      playground: isDev(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
