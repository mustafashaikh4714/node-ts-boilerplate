import { Request } from 'express'
import { Types } from 'mongoose'

export interface IRequestAuth extends Request {
  id: Types.ObjectId
  email: string
}
