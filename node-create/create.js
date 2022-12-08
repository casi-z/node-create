const fs = require(`fs`)
const settings = require('./settings.json');

//Получаем имя файла из консоли
const name = process.argv.at(-1)

let varPath = ''

//Строим относительный путь от выбранной вами папки до var.scss

function pathConstructor(){

    const splittedPath = settings.path.split('/')

    splittedPath.forEach(e => {
        varPath += '../'
    })
}

pathConstructor()


//Создаем файлы компонента и вводим в них шаблон

function filesCreate() {

    const innerJsx = `import './${name}.scss'
const {log} = console
function ${name}({props}) {
    return(<>
    
    </>)
}
export default ${name};
`
    const innerScss = `@import "../${varPath}scss/var.scss";`



    try {
        fs.mkdirSync(`../src/${settings.path}/${name}`);
        fs.writeFileSync(`../src/${settings.path}/${name}/${name}.jsx`, innerJsx);
        fs.writeFileSync(`../src/${settings.path}/${name}/${name}.scss`, innerScss);

    } catch (error) {
        //Выводим ошибку если компонент уже существует
        console.error('This component is already exist');

    }
}
filesCreate()

//Создаем папку scss и файл var.scss если они не существуют

function scssCheck(){
    try {
        fs.mkdir(`../src/scss`);
    } catch (error) {
        
    }
    try {
        fs.open('../src/scss/var.scss', 'w+', (err, fd) => {
            //fd - это дескриптор файла
        })
            
    } catch (error) {
        
    }
}

scssCheck()