"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Env = void 0;
var class_validator_1 = require("class-validator");
var Env = /** @class */ (function () {
    function Env() {
        this.PORT = "3000";
    }
    __decorate([
        class_validator_1.IsUrl({
            require_protocol: true,
            require_valid_protocol: false,
            require_tld: false
        })
    ], Env.prototype, "DATABASE_URL");
    __decorate([
        class_validator_1.IsIn(["development", "production", "test"])
    ], Env.prototype, "NODE_ENV");
    __decorate([
        class_validator_1.IsPort(),
        class_validator_1.IsOptional()
    ], Env.prototype, "PORT");
    return Env;
}());
exports.Env = Env;
//# sourceMappingURL=env.js.map