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
//Подключаем файл с пользовательскими настройками
const settings = require(global.settingsPath);
//Получаем имя файла из консоли
componentInit(process.argv.slice(2));
function componentInit(components) {
    if (components.length) {
        components.forEach(component => createFiles(component[0].toUpperCase() + component.slice(1), globalSassVariablesPathConstructor(), setPrefix(component)));
    }
    else
        global.error(`Incorrect component name`);
}
function setPrefix(string) {
    const prefixSpecSymbol = string.indexOf('--');
    if (prefixSpecSymbol !== -1)
        return string.slice(prefixSpecSymbol + 2);
    else
        return false;
}
//Строим относительный путь от выбранной вами папки до var.scss
function globalSassVariablesPathConstructor() {
    let globalSassVariablesPath = '';
    const pathParts = settings.path.split('/');
    pathParts.forEach(() => globalSassVariablesPath += '../');
    return globalSassVariablesPath;
}
//Создаем файлы компонента и вводим в них шаблон
function createFiles(componentName, globalSassVariablesPath, prefix) {
    // Функция для замены спецсимволов в настройках
    function specSymbolReplacer(string) {
        const settingsSpecialSymbols = [
            { from: 'componentName', to: componentName },
            { from: 'varPath', to: globalSassVariablesPath },
        ];
        settingsSpecialSymbols.forEach(settingsSpecialSymbol => {
            string = string.replaceAll(`#{${settingsSpecialSymbol.from}}`, settingsSpecialSymbol.to);
        });
        return string;
    }
    if (prefix)
        componentName = componentName.slice(0, componentName.indexOf('--'));
    //Создание папки с компонентом
    const componentFolderPath = `${global.srcPath}/${settings.path}/${componentName}`;
    fs.mkdirSync(componentFolderPath);
    settings.onPrefix[prefix || 'default'].files.forEach((file) => {
        const innerText = specSymbolReplacer(file.text.join("\n"));
        fs.writeFileSync(`${componentFolderPath}/${specSymbolReplacer(file.name)}`, innerText);
    });
}
//# sourceMappingURL=create.js.map