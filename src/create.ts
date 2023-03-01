const fs = require(`fs`)
import * as global from './global'
//Подключаем файл с пользовательскими настройками

const settings = require(global.settingsPath);

//Получаем имя файла из консоли

componentInit(process.argv.slice(2))

function componentInit(components: string[] | []) {
	if (components.length) {
		components.forEach(component =>

			createFiles(
				component[0].toUpperCase() + component.slice(1),
				globalSassVariablesPathConstructor(),
				setPrefix(component)
			)
		)
	} else global.error(`Incorrect component name`)
}

function setPrefix(string: any) {
	const prefixSpecSymbol = string.indexOf('--')

	if (prefixSpecSymbol !== -1) return string.slice(prefixSpecSymbol + 2)
	else return false
}

//Строим относительный путь от выбранной вами папки до var.scss

function globalSassVariablesPathConstructor() {

	let globalSassVariablesPath = ''

	const pathParts = settings.path.split('/')

	pathParts.forEach(() => globalSassVariablesPath += '../')

	return globalSassVariablesPath
}




//Создаем файлы компонента и вводим в них шаблон
function createFiles(componentName: string, globalSassVariablesPath: string, prefix: string) {

	// Функция для замены спецсимволов в настройках
	function specSymbolReplacer(string: string) {

		const settingsSpecialSymbols = [
			{ from: 'componentName', to: componentName },
			{ from: 'varPath', to: globalSassVariablesPath },
		]
		settingsSpecialSymbols.forEach(settingsSpecialSymbol => {
			string = string.replaceAll(`#{${settingsSpecialSymbol.from}}`, settingsSpecialSymbol.to)
		})
		return string
	}

	if (prefix) componentName = componentName.slice(0, componentName.indexOf('--'))



	//Создание папки с компонентом

	const componentFolderPath = `${global.srcPath}/${settings.path}/${componentName}`

	fs.mkdirSync(componentFolderPath)

	//Создание файлов компонента выбор шаблона компонента по префиксу

	interface IFile {
		name: string,
		text: string[]
	}

	settings.onPrefix[prefix || 'default'].files.forEach((file: IFile) => {

		const innerText = specSymbolReplacer(file.text.join("\n"))

		fs.writeFileSync(`${componentFolderPath}/${specSymbolReplacer(file.name)}`, innerText)
	})
}
