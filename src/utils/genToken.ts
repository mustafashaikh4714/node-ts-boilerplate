import jwt from 'jwt-simple'

export default (user: any) => jwt.encode(user, process.env.JWT_SECRET!.trim())
