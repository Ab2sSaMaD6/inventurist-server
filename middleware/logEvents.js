const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logsPath = '../logs'

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'ddMMyy\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    console.log(logItem)

    try {
        if (!fs.existsSync(path.join(__dirname, logsPath))) await fsPromises.mkdir(path.join(__dirname, logsPath))

        await fsPromises.appendFile(path.join(__dirname, logsPath, logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method}\t${req.headers.origin}\t${req.url}`)

    next()
}

module.exports = { logger, logEvents }