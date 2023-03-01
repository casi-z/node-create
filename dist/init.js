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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const colors_1 = __importDefault(require("colors"));
const prompt = require("prompt-sync")({ sigint: true });
const global = __importStar(require("./global"));
const lockSettings = require('./settings-lock.json');
const pattern = require('./pattern.json');
const { log } = console;
nodeCreateSettingsConstructor(getInputSettings());
//Функция для добавления таба в prompt
function getPrompt(question, answerType, answerVariant) {
    let answerTip = '';
    switch (answerType) {
        case 'boolean':
            answerTip = `(y/n)`;
        case 'string':
            if (answerVariant) {
                answerTip = `(${Object(answerVariant).toString()})`;
            }
    }
    while (true) {
        log("	");
        const answer = prompt(`${question} ${answerTip}	 `);
        if (answerType === 'string' && Object(answerVariant).indexOf(answer) !== -1) {
            return answer;
        }
        if (answerType === 'boolean') {
            if (answer === 'y')
                return true;
            if (answer === 'n')
                return false;
        }
    }
}
function getInputSettings() {
    log(colors_1.default.yellow('Let`s set the component settings for your project'));
    const inputSettings = {
        useTypescript: false,
        useMui: false,
        useCssPreprocessor: '',
        useCss: false,
    };
    inputSettings.useTypescript = getPrompt(colors_1.default.cyan('Do you use Typescript in your prоject?'), 'boolean');
    inputSettings.useMui = getPrompt(colors_1.default.cyan('Do you use MUI in your prоject?'), 'boolean');
    if (!inputSettings.useMui) {
        inputSettings.useCssPreprocessor = getPrompt(colors_1.default.cyan('Do you use CSS preprocessor in you project?'), 'string', ['sass', 'scss', 'none']);
        if (inputSettings.useCssPreprocessor !== 'none') {
            inputSettings.useCss = getPrompt(colors_1.default.cyan('Do you need to CSS file in your components?'), 'boolean');
        }
    }
    return inputSettings;
}
// Выбираем шаблон по полученным параметрам и записываем в файл node-create-settings.json
function nodeCreateSettingsConstructor(params) {
    let nodeCreateSettings = {
        path: lockSettings.path
    };
    //Выбираем шаблон
    function setPattern() {
        let choosedPattern = { mainFile: '', styleFile: '' };
        if (params.useTypescript) {
            choosedPattern.mainFile = 'tsx';
        }
        else {
            choosedPattern.mainFile = 'jsx';
        }
        if (params.useMui) {
            choosedPattern.styleFile = 'mui';
            return choosedPattern;
        }
        if (params.useCssPreprocessor !== 'none') {
            choosedPattern.styleFile = params.useCssPreprocessor;
            varScssCreate(params.useCssPreprocessor);
            return choosedPattern;
        }
        if (params.useCss) {
            choosedPattern.styleFile = 'css';
        }
        else {
            choosedPattern.styleFile = '';
        }
        return choosedPattern;
    }
    nodeCreateSettings.onPrefix = pattern[`${setPattern().mainFile}_${setPattern().styleFile}`];
    // Создаем файл с шаблоном
    fs.writeFileSync(global.settingsPath, JSON.stringify(nodeCreateSettings, null, 4));
    // Создаём папки для шрифтов и изображений	
    createIfDoesNotExist(`${global.publicPath}/fonts`, 'folder');
    createIfDoesNotExist(`${global.publicPath}/img`, 'folder');
}
function createIfDoesNotExist(path, type, text) {
    if (type === 'file') {
        fs.readFileSync(path, 'utf8', (err) => {
            if (err)
                fs.writeFileSync(path, text || '');
        });
    }
    if (type === 'folder') {
        try {
            fs.mkdirSync(`${global.srcPath}/scss`);
        }
        catch (err) { }
    }
}
function varScssCreate(preprocessorType) {
    createIfDoesNotExist(`${global.srcPath}/scss/var.${preprocessorType}`, 'file', `
		//Use this file for write global variables

		//Happy hacking!
	`);
    createIfDoesNotExist(`${global.srcPath}/${preprocessorType}/`, 'folder');
}
//# sourceMappingURL=init.js.map