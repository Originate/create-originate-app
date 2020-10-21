import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { env, isDev } from "./env"
import { RecipesModule } from "./recipes/recipes.module"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "schema.graphql"),
      sortSchema: true,
      debug: isDev(),
      playground: isDev(),
    }),
    RecipesModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      url: env.DATABASE_URL,
      autoLoadEntities: true,

      // In dev mode only, automatically updates database schema on app start to
      // match entity classes in `src/entity/**/*.ts`. After updating entities
      // (whether or not the database schema has been synced) you can generate
      // a migration automatically by running
      //
      //     $ yarn db:migration:generate -n NameOfMigrationModule
      //
      synchronize: isDev(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
