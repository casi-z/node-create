"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require(`fs`);
const global = __importStar(require("./global"));
const settings = require(global.settingsPath);
const lockSettings = require('./settings-lock.json');
const currentPath = settings.path;
//Получаем введённый путь из консоли, проверяем на недопустимые символы
passChecker(process.argv.at(-1));
function passChecker(inputPath) {
    console.log(inputPath);
    if (inputPath) {
        if (inputPath[0] === '+') {
            passTester(`${global.srcPath}/${currentPath}${inputPath.replace('+', '/')}`);
        }
        else {
            passTester(`${global.srcPath}/${inputPath}`);
        }
    }
    else
        setPass(lockSettings.path);
}
//Проверяем существует ли папка
function passTester(processedPath) {
    fs.stat(processedPath, (err, stats) => {
        if (err || !stats.isDirectory()) {
            global.error('This folder doesn`t exist');
        }
        else
            setPass(processedPath);
    });
}
//Записываем новый путь в settings.json, производим конкатенацию при введённом +
function setPass(path) {
    path = path.replace(`${global.srcPath}/`, '');
    fs.writeFileSync(global.settingsPath, JSON.stringify({ ...settings, path }, null, 4));
}
//# sourceMappingURL=set.js.map