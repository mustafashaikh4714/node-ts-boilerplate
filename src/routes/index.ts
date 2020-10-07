import { Application } from 'express'
import userAccount from './user/user.account'

module.exports = (app: Application) => {
  userAccount(app)
}
