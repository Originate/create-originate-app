"use strict";
// TypeORM sources this file automatically when a database connection is created
// in the app, and when running TypeORM CLI commands.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    throw new Error("You must configure a database via the DATABASE_URL environment variable.");
}
module.exports = [
    // Default connection
    {
        type: "postgres",
        url: dbUrl,
        entities: ["src/**/*.entity.ts"],
        migrations: ["src/migration/**/*.ts"],
        subscribers: ["src/**/*.subscriber.ts"],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber"
        }
    },
];
//# sourceMappingURL=ormconfig.js.map