const fs = require('fs');
import colors from 'colors';
const prompt = require("prompt-sync")({ sigint: true });
import * as global from './global'
const lockSettings = require('./settings-lock.json');
const pattern = require('./pattern.json');

const { log } = console

nodeCreateSettingsConstructor(getInputSettings())


//Функция для добавления таба в prompt
function getPrompt(question: string, answerType: string, answerVariant?: readonly string[],) {
	let answerTip = ''
	switch (answerType) {
		case 'boolean':

			answerTip = `(y/n)`

		case 'string':

			if (answerVariant) {
				answerTip = `(${Object(answerVariant).toString()})`
			}

	}

	while (true) {

		log("	")
		const answer = prompt(`${question} ${answerTip}	 `)
		if (answerType === 'string' && Object(answerVariant).indexOf(answer) !== -1) {

			return answer

		}
		if (answerType === 'boolean') {

			if (answer === 'y') return true
			if (answer === 'n') return false

		}

	}
}



//Получаем параметры от пользователя
	


interface ISettingsInput {
	useTypescript: boolean,
	useCss: boolean,
	useCssPreprocessor: string,
	useMui: boolean,
}

function getInputSettings() {

	log(colors.yellow('Let`s set the component settings for your project'))

	const inputSettings: ISettingsInput = {
		useTypescript: false,
		useMui: false,
		useCssPreprocessor: '',
		useCss: false,
	}

	inputSettings.useTypescript = getPrompt(

		colors.cyan('Do you use Typescript in your prоject?'),
		'boolean'

	)

	inputSettings.useMui = getPrompt(

		colors.cyan('Do you use MUI in your prоject?'),
		'boolean'

	)
	

	if (!inputSettings.useMui) {

		inputSettings.useCssPreprocessor = getPrompt(
	
			colors.cyan('Do you use CSS preprocessor in you project?'),
			'string',
			['sass', 'scss', 'none']
	
		)
	
		if (inputSettings.useCssPreprocessor !== 'none') {
			
			inputSettings.useCss = getPrompt(

				colors.cyan('Do you need to CSS file in your components?'),
				'boolean'

			)
	
		}
	}

	return inputSettings

}



// Выбираем шаблон по полученным параметрам и записываем в файл node-create-settings.json

function nodeCreateSettingsConstructor(params: ISettingsInput) {

	let nodeCreateSettings: any = {
		path: lockSettings.path
	}

	//Выбираем шаблон

	function setPattern() {

		let choosedPattern = { mainFile: '', styleFile: '' }

		if (params.useTypescript) {

			choosedPattern.mainFile = 'tsx'

		} else {

			choosedPattern.mainFile = 'jsx'

		}
		if (params.useMui) {

			choosedPattern.styleFile = 'mui'
			return choosedPattern

		}


		if (params.useCssPreprocessor !== 'none') {

			choosedPattern.styleFile = params.useCssPreprocessor
			varScssCreate(params.useCssPreprocessor)
			return choosedPattern

		}
			

		if (params.useCss) {
			
			choosedPattern.styleFile = 'css'

		} else {

			choosedPattern.styleFile = ''

		}
			
		return choosedPattern

	}

	nodeCreateSettings.onPrefix = pattern[`${setPattern().mainFile}_${setPattern().styleFile}`]

	// Создаем файл с шаблоном

	fs.writeFileSync(global.settingsPath, JSON.stringify(nodeCreateSettings, null, 4))

	// Создаём папки для шрифтов и изображений	

	createIfDoesNotExist(`${global.publicPath}/fonts`, 'folder')
	createIfDoesNotExist(`${global.publicPath}/img`, 'folder')

}


function createIfDoesNotExist(path: string, type: string, text?: string) {

	if (type === 'file') {
		fs.readFileSync(path, 'utf8', (err: any) => {
	
			if (err) fs.writeFileSync(path, text || '')
	
		})
	}
	if (type === 'folder') {
		try {
			fs.mkdirSync(`${global.srcPath}/scss`);
	
		} catch (err){}
	}

}

function varScssCreate(preprocessorType: string) {

	createIfDoesNotExist(`${global.srcPath}/scss/var.${preprocessorType}`, 'file', `
		//Use this file for write global variables

		//Happy hacking!
	`)

	createIfDoesNotExist(`${global.srcPath}/${preprocessorType}/`, 'folder')

}