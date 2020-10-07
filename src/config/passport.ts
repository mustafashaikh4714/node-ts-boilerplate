import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { User } from '../models/User'

module.exports = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET!.trim()
      },
      (payload, done) => {
        User.findOne({ _id: payload.id }, (err, user) => {
          if (err) return done(err, false)
          if (user) {
            return done(null, user)
          } else return done(null, false)
        })
      }
    )
  )
}
