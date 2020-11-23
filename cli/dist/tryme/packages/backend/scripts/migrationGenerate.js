"use strict";
// TypeORM generates migration by diffing configuration in entity classes
// against the current database schema. If the developer has been fiddling with
// their dev database - especially if they have been using TypeORM's `sync`
// option - the dev database schema might be out-of-sync with what you would get
// by running migrations from scratch.
//
// This script spins up a fresh database in a temporary docker container, runs
// migrations, and generates a migration off of the resulting schema.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// TODO: move to @originate/scripts
var docker_await_postgres_1 = require("@originate/docker-await-postgres");
var child_process_1 = require("child_process");
var processArgs = process.argv.slice(2);
var config = {
    user: "postgres",
    password: "password",
    database: "postgres",
    image: "postgres:latest"
};
var stopDatabase;
var ProcessError = /** @class */ (function (_super) {
    __extends(ProcessError, _super);
    function ProcessError(exitStatus) {
        var _this = _super.call(this, "process exited with status: " + exitStatus) || this;
        _this.exitStatus = exitStatus;
        return _this;
    }
    return ProcessError;
}(Error));
// Waits for a child process to exit, and resolves with its exit status.
function onExit(childProcess) {
    return new Promise(function (resolve, reject) {
        childProcess.on("close", resolve);
        childProcess.on("error", reject);
    });
}
function typeorm(dbUrl, subcommand, args) {
    if (args === void 0) { args = []; }
    return __awaiter(this, void 0, void 0, function () {
        var childProcess, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    process.env.DATABASE_URL = dbUrl;
                    childProcess = child_process_1.spawn("yarn", ["typeorm", subcommand].concat(args), {
                        env: __assign({ DATABASE_URL: dbUrl }, process.env),
                        stdio: [process.stdin, process.stdout, process.stderr]
                    });
                    return [4 /*yield*/, onExit(childProcess)];
                case 1:
                    status = _a.sent();
                    if (status !== 0) {
                        throw new ProcessError(status);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function runMigrations(dbUrl) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, typeorm(dbUrl, "migration:run")];
        });
    });
}
function generateMigration(dbUrl, args) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, typeorm(dbUrl, "migration:generate", args)];
        });
    });
}
function cleanUp() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!stopDatabase) return [3 /*break*/, 2];
                    return [4 /*yield*/, stopDatabase()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, port, stop_1, dbUrl, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 7]);
                    return [4 /*yield*/, docker_await_postgres_1.startPostgresContainer(config)];
                case 1:
                    _a = _b.sent(), port = _a.port, stop_1 = _a.stop;
                    stopDatabase = stop_1;
                    dbUrl = "postgres://" + config.user + ":" + config.password + "@localhost:" + port + "/" + config.database;
                    console.log("\n# Running existing migrations in temporary database");
                    return [4 /*yield*/, runMigrations(dbUrl)];
                case 2:
                    _b.sent();
                    console.log("\n# Generating new migration");
                    return [4 /*yield*/, generateMigration(dbUrl, processArgs)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, cleanUp()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    err_1 = _b.sent();
                    return [4 /*yield*/, cleanUp()];
                case 6:
                    _b.sent();
                    process.exit(err_1 instanceof ProcessError ? err_1.exitStatus : 1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Shut down temporary database if this script is terminated early.
process.once("SIGINT", function () { return cleanUp; });
process.once("SIGTERM", function () { return cleanUp; });
main();
//# sourceMappingURL=migrationGenerate.js.map