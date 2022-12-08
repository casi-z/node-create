const fs = require(`fs`)
//Получаем введённый путь из консоли, проверяем на недопустимые символы
const inputPath = process.argv.at(-1)

const currentPath = require('./settings.json').path;


function passChecker(params) {
    if (currentPath === inputPath) return

    if(
        inputPath[0] === '/' || inputPath[0] === '\\' || inputPath[0] === '.' ||
        inputPath.at(-1) === '/' || inputPath.at(-1) === '\\' || inputPath.at(-1) === '.'
        
    ){
        console.error('Вводите путь без "/" и "." в начале и конце')
        return

    }
}
passChecker()

//Проверяем существует ли папка

function passTester(path){
    
    
    fs.stat(path, (err, stats) => {
        if (err) {
        console.error('This folder doesn`t exist')
        return
        }
        if(!stats.isDirectory()){ 
            console.error('This folder doesn`t exist')
            return
        }
        setPass()    
    })
}



if(inputPath[0] === '+') passTester(`../src/${currentPath}${inputPath.replace('+', '/')}`)
else passTester(`../src/${inputPath}`)

//Записываем новый путь в settings.json

function setPass(){
    if(inputPath[0] === '+'){
        fs.writeFileSync('./settings.json', JSON.stringify({path:`${currentPath}${inputPath.replace('+', '/')}`,}))
    }else{
        fs.writeFileSync('./settings.json', JSON.stringify({path:`${inputPath}`,}))
    }
}

