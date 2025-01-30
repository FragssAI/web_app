import chalk from 'chalk'

const info = (...params) => {
    console.log(chalk(...params))
}

const error = (...params) => {
    console.error(chalk.bold.red(...params))
}

const logger ={
    info,
    error
}

export default logger