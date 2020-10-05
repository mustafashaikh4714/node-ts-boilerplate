import { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'

morgan.token('emotus', (_: any, res: any) => {
  if (res.statusCode < 400) {
    return '✔️ '
  }

  return '⚠️ '
})

const loggerMiddleware = () => {
  if (process.env.NODE_ENV !== 'development') {
    return (req: Request, res: Response, next: NextFunction) => next()
  }

  return morgan(':emotus :method :url :status, ⌛ :response-time ms [ :date[web] ]')
}

export default loggerMiddleware
