const fs = require(`fs`)

import * as global from './global'
const settings = require(global.settingsPath);

const lockSettings = require('./settings-lock.json')

const currentPath = settings.path

//Получаем введённый путь из консоли, проверяем на недопустимые символы
passChecker(process.argv.at(-1))

function passChecker(inputPath: any) {
	console.log(inputPath);
	
	if (inputPath) {
	
		if (inputPath[0] === '+') {
			passTester(`${global.srcPath}/${currentPath}${inputPath.replace('+', '/')}`)
		} else {
			passTester(`${global.srcPath}/${inputPath}`)
		}

	} else setPass(lockSettings.path)
	
}

//Проверяем существует ли папка
function passTester(processedPath: string) {

	fs.stat(processedPath, (err: string, stats: any) => {

		if (err || !stats.isDirectory()) {
			global.error('This folder doesn`t exist')
		} 
		else setPass(processedPath)
	})

}


//Записываем новый путь в settings.json, производим конкатенацию при введённом +

function setPass(path: string) {
	path = path.replace(`${global.srcPath}/`, '')
	fs.writeFileSync(global.settingsPath, JSON.stringify({ ...settings, path }, null, 4))

}
