import colors from 'colors'

export const projectPath = `../../..`
export const srcPath = `${projectPath}/src`
export const publicPath = `${projectPath}/public`
export const settingsPath = `${projectPath}/node-create-settings.json`
export const error = (text: string) => console.error(colors.red(text))