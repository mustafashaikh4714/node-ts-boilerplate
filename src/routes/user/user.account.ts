import clean from 'clean-deep'
import { Application, Request, Response } from 'express'
import authenticate from '../../config/passport.auth'
import { User } from '../../models/User'
import { LoginSchema, SignupSchema } from '../../schema/user.schema'
import genToken from '../../utils/genToken'
import validate from '../../utils/validator'

export default (app: Application) => {
  app.post('/api/user/signup', async (req, res) => {
    const { username, email, password } = clean(req.body)

    const { values, error } = validate(SignupSchema, {
      username,
      email,
      password
    })

    if (error) {
      return res.status(400).send({ message: error })
    }

    const doesUserAlreadyExist = await User.findOne({ email: values.email })
    if (doesUserAlreadyExist) {
      return res.status(403).send({ message: 'User already exists!' })
    }

    const user = new User(values)

    try {
      await user.save()
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
    res.send({ message: 'User created successfully.' })
  })

  app.post('/api/user/login', async (req, res) => {
    const { email, password } = clean(req.body)

    const { values, error } = validate(LoginSchema, {
      email,
      password
    })

    if (error) {
      return res.status(400).send({ message: error })
    }

    const user = await User.findOne({ email: values.email })

    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials!' })
    }

    const payload = { id: user.id, email: user.email }
    const token = genToken(payload)

    res.send({ message: 'User created successfully.', token })
  })

  app.get('/api/user/details', authenticate, async (req: Request, res: Response) => {
    const { email } = req.authuser!

    const userDetails = await User.findOne({ email })

    res.send({ userDetails })
  })
}
