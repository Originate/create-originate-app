import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "path"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigService } from "./config.service"
import { RecipesModule } from "./recipes/recipes.module"

const config = new ConfigService()

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "schema.graphql"),
      sortSchema: true,
      debug: config.isDev,
      playground: config.isDev,
    }),
    RecipesModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      url: config.env.DATABASE_URL,

      // When `autoLoadEntities` is on TypeORM entity classes (classes with the
      // `@Entity` annotation) are automatically wired into the main app *if*
      // a Nest module imports `TypeOrmModule.forFeature([...])` and lists the
      // entity class. In other words, for every entity class there should be
      // a Nest module that looks something like this:
      //
      //     @Module({
      //       imports: [TypeOrmModule.forFeature([EntityClassA, EntityClassB, /* ... */])]
      //     })
      //     export class SomeModule {}
      //
      autoLoadEntities: true,

      // In dev mode only, automatically updates database schema on app start to
      // match entity classes in `src/entity/**/*.ts`. After updating entities
      // (whether or not the database schema has been synced) you can generate
      // a migration automatically by running
      //
      //     $ yarn db:migration:generate -n NameOfMigrationModule
      //
      synchronize: config.isDevDatabase,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: ConfigService, useValue: config }],
})
export class AppModule {}
