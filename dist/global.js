"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.settingsPath = exports.publicPath = exports.srcPath = exports.projectPath = void 0;
const colors_1 = __importDefault(require("colors"));
exports.projectPath = `../../..`;
exports.srcPath = `${exports.projectPath}/src`;
exports.publicPath = `${exports.projectPath}/public`;
exports.settingsPath = `${exports.projectPath}/node-create-settings.json`;
const error = (text) => console.error(colors_1.default.red(text));
exports.error = error;
//# sourceMappingURL=global.js.map