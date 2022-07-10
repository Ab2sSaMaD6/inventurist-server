const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const credentails = require('./middleware/credentails')

const PORT = process.env.PORT || 5000

// custom miiddleware logger
app.use(logger)

// handle options creadentials check - before CROS!
// and fetch cookies creadentials requirement
app.use(credentails)

// cross
app.use(cors(corsOptions))

//built-in miiddleware to handle urlencoded data (form-data)
app.use(express.urlencoded({ extended: false }))
//built-in miiddleware for json
app.use(express.json())
//middleware for cookies
app.use(cookieParser())

// serve static files
app.use(express.static('./public/css', { root: __dirname }))

// routes
app.use('/', require('./routes/root'))
app.use('/signals', require('./routes/api/signals'))

app.all('*', (req, res) => {
    res.status(404)

    if (req.accepts('html')) res.sendFile('./views/404.html', { root: __dirname })
    else if (req.accepts('json')) res.json({ error: '404 Not Found!' })
    else res.type('txt').send('404 Not Found!')
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
