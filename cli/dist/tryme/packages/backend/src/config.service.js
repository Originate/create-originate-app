"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfigService = void 0;
var common_1 = require("@nestjs/common");
var class_transformer_validator_1 = require("class-transformer-validator");
var class_validator_1 = require("class-validator");
var dotenv_1 = require("dotenv");
var url_1 = require("url");
var env_1 = require("./env");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        dotenv_1.config();
        try {
            // `transformAndValidateSync` automatically checks its input object (`env`)
            // for required properties and applies validations based on the properties
            // and annotations in the reference class (`Env`).
            this.env = class_transformer_validator_1.transformAndValidateSync(env_1.Env, process.env);
        }
        catch (error) {
            // Format validation errors nicely
            if (Array.isArray(error)) {
                console.error(error
                    .map(function (e) {
                    return e instanceof class_validator_1.ValidationError && e.constraints
                        ? Object.values(e.constraints).join("\n")
                        : e.toString();
                })
                    .join("\n"));
                process.exit(1);
            }
            else {
                throw error;
            }
        }
    }
    Object.defineProperty(ConfigService.prototype, "isDev", {
        get: function () {
            return this.env.NODE_ENV === "development";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "isDevDatabase", {
        /**
         * Checks that `NODE_ENV == "development"`, and adds an extra sanity check
         * that `DATABASE_URL` is local to avoid synchronizing schema to a production
         * database.
         */
        get: function () {
            return this.isDev && this.isLocalDatabase;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "isTest", {
        get: function () {
            return this.env.NODE_ENV === "test";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "isLocalDatabase", {
        get: function () {
            var db = url_1.parse(this.env.DATABASE_URL);
            return db.hostname === "localhost";
        },
        enumerable: false,
        configurable: true
    });
    ConfigService = __decorate([
        common_1.Injectable()
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map