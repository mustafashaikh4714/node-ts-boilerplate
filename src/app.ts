import express, { Application } from 'express'
import helmet from 'helmet'
import passport from 'passport'
import errorHandler from './middlewares/error'
import loggerMiddleware from './middlewares/logger'

export const app: Application = express()

// APPLY EXPRESS MIDDLEWARES.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(errorHandler)
app.use(loggerMiddleware())

require('./routes')(app)
require('./config/passport')(passport)
app.use(passport.initialize())
