import { NextFunction, Request, Response } from 'express'

interface IError {
  statusCode: number
  status: string
  message: string
}
const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 400
  err.status = err.status || 'Bad Request'

  // console.error(err.stack)

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}

export default errorHandler
