# node-create
Этот скрипт позволяет создавать реакт компоненты в один клик и объявлять sass переменные на весь проект

# Начало работы

Для начала работы скиньте папку node_create в корень вашего React приложения. Дополнительных библиотек устанавливать не нужно 

Используйте команду 

# npm run set ПУТЬ_ПАПКИ 

для выбора папки, в которой хотите создать компонент. Путь указывается относительно папки src и только внутри неё.

Например если хотите выбрать папку src/components, пишите: 

# npm run set components

Папку src указывать не нужно, также нельзя ставить точки, слэши и другие символы в конце и начале пути.

Если вам нужно прибавить к исходному пути новую папку, в начале пути пишется +

Например если у вас уже выбранна папка components и вы хотите выбрать папку components/MainPage , пишите:

# npm run set +MainPage

Путь таже можно менять в файле settings.json

# Создание компонента

Для создания компонента используйте команду 

# npm run add ИМЯ_КОМПОНЕНТА

Компонент будет создан по выбранному вами пути.
Он представляет из себя папку с введённым именем, файл ИМЯ_КОМПОНЕНТА.jsx с шаблоном и файл ИМЯ_КОМПОНЕНТА.scss 

В файл scss автоматически импортируется файл src/scss/var.scss
Если такого файла нет, он будет создан. Используется он для объявления scss переменных. Файл var.scss импортируется в любой созданный компонент в любом месте приложения, относительный путь к нему простраивается автоматически, а значит объявленные в нём переменные доступны в любом месте вашего проекта.
Для работы с scss файлами нужно установить библиотеку node-sass подходящей версии.
