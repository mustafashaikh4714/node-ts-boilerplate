import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import passport from 'passport'

interface UserPayload {
  id: Types.ObjectId
  email: string
}

declare global {
  namespace Express {
    export interface Request {
      authuser?: UserPayload
    }
  }
}
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate(
    'jwt',
    {
      session: false
    },
    (err, user, info) => {
      if (err) {
        console.log(err)
        return next(err)
      }
      if (!user) {
        return res.status(401).send({
          error: 'UNAUTHORIZED_USER'
        })
      }
      // Forward user information to the next middleware
      const payload = { email: user.email, id: user.id }
      req.authuser = payload
      next()
    }
  )(req, res, next)
}
export default authenticate
