"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("@nestjs/typeorm");
var path_1 = require("path");
var config_service_1 = require("./config.service");
var recipes_module_1 = require("./recipes/recipes.module");
var config = new config_service_1.ConfigService();
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                graphql_1.GraphQLModule.forRoot({
                    autoSchemaFile: path_1.join(process.cwd(), "schema.graphql"),
                    sortSchema: true,
                    debug: config.isDev,
                    playground: config.isDev
                }),
                recipes_module_1.RecipesModule,
                typeorm_1.TypeOrmModule.forRoot({
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
                    synchronize: config.isDevDatabase
                }),
            ],
            providers: [{ provide: config_service_1.ConfigService, useValue: config }]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map