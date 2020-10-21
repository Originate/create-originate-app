import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { isDev } from "./env"
import { RecipesModule } from "./recipes/recipes.module"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "schema.graphql"),
      sortSchema: true,
      debug: isDev(),
      playground: isDev(),
    }),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
