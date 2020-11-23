"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.findEmptyPort = exports.searchReplaceFile = exports.editEnvFile = exports.editPackageJson = exports.updateTemplate = exports.copyTemplate = exports.UnreachableCaseError = exports.BACKEND_REGEXP = exports.FRONTEND_REGEXP = exports.Package = exports.log = void 0;
var prettier = __importStar(require("prettier"));
var fs = __importStar(require("fs"));
var fse = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var chalk_1 = __importDefault(require("chalk"));
//@ts-ignore
var portastic = __importStar(require("portastic"));
exports.log = console.log;
var Package;
(function (Package) {
    Package["Frontend"] = "frontend";
    Package["Backend"] = "backend";
})(Package = exports.Package || (exports.Package = {}));
exports.FRONTEND_REGEXP = /\NEXT_PUBLIC_GRAPHQL_URL=http:\/\/localhost:\d+\/graphql/;
exports.BACKEND_REGEXP = /\PORT=\d+/g;
var UnreachableCaseError = /** @class */ (function (_super) {
    __extends(UnreachableCaseError, _super);
    function UnreachableCaseError(val) {
        return _super.call(this, "Unreachable case: " + JSON.stringify(val)) || this;
    }
    return UnreachableCaseError;
}(Error));
exports.UnreachableCaseError = UnreachableCaseError;
function copyTemplate(srcDir, targetDir) {
    try {
        fse.copySync(srcDir, targetDir, {
            filter: function (path) {
                return !(path.indexOf("node_modules") > -1);
            }
        });
        exports.log(chalk_1["default"].cyan("Template copied to:\n  " + chalk_1["default"].cyan.bold(targetDir)));
    }
    catch (_a) {
        throw new Error(chalk_1["default"].red("Error copying template from " + srcDir + " to " + targetDir));
    }
}
exports.copyTemplate = copyTemplate;
function updateTemplate(appName, targetDir, port) {
    editPackageJson(appName, targetDir, Package.Frontend);
    editPackageJson(appName, targetDir, Package.Backend);
    editEnvFile(port, targetDir, Package.Frontend);
    editEnvFile(port, targetDir, Package.Backend);
    exports.log(chalk_1["default"].cyan("Updated template with values: \n  package name: " + chalk_1["default"].cyan.bold(appName) + "\n  backend port: " + chalk_1["default"].cyan.bold(port) + "\n"));
}
exports.updateTemplate = updateTemplate;
function editPackageJson(appName, targetDir, packageName) {
    var filename = path.join(targetDir, "packages/" + packageName + "/package.json");
    try {
        var json = JSON.parse(fs.readFileSync(filename).toString());
        json = Object.assign({}, json, {
            name: "@" + appName + "/" + packageName
        });
        fs.writeFileSync(filename, prettier.format(JSON.stringify(json), { semi: false, parser: "json" }));
        exports.log(chalk_1["default"].blue("Prepared " + filename));
    }
    catch (err) {
        throw new Error(chalk_1["default"].red("Error preparing " + filename + "\n" + err));
    }
}
exports.editPackageJson = editPackageJson;
function editEnvFile(port, targetDir, packageName) {
    switch (packageName) {
        case Package.Frontend: {
            var filename = targetDir + "/packages/" + packageName + "/.env.development";
            var replace = "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:" + port + "/graphql";
            searchReplaceFile(exports.FRONTEND_REGEXP, replace, filename);
            return;
        }
        case Package.Backend: {
            var filename = targetDir + "/packages/" + packageName + "/.env";
            var replace = "PORT=" + port;
            searchReplaceFile(exports.BACKEND_REGEXP, replace, filename);
            return;
        }
        default:
            throw new UnreachableCaseError(packageName);
    }
}
exports.editEnvFile = editEnvFile;
function searchReplaceFile(regexp, replace, filename) {
    var newEnv = "";
    fs.readFileSync(filename, "utf8")
        .split("\n")
        .forEach(function (line) {
        newEnv += line.replace(regexp, replace) + "\n";
    });
    try {
        fs.writeFileSync(filename, newEnv);
        exports.log(chalk_1["default"].blue("Prepared " + filename));
    }
    catch (err) {
        throw new Error(chalk_1["default"].red("Error preparing " + filename + "\n" + err));
    }
}
exports.searchReplaceFile = searchReplaceFile;
function findEmptyPort() {
    return __awaiter(this, void 0, void 0, function () {
        var randomPort, inUse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    randomPort = Math.floor(Math.random() * (65535 - 10000 + 1)) + 10000;
                    return [4 /*yield*/, portastic.test(randomPort)];
                case 1:
                    inUse = _a.sent();
                    if (inUse) {
                        return [2 /*return*/, findEmptyPort()];
                    }
                    else {
                        return [2 /*return*/, randomPort];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.findEmptyPort = findEmptyPort;
//# sourceMappingURL=helpers.js.map