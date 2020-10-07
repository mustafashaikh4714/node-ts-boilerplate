import request from 'supertest'
import { app } from '../../app'

describe('User Signup', () => {
  it('Should fail if inputs are invalid', async () => {
    const invalidCreds = {
      username: '',
      email: 'wrongEmail',
      password: '1234'
    }
    await request(app).post('/api/user/signup').send({ invalidCreds }).expect(400)
  })

  it('Should return 200 on success.', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({
        username: 'Username',
        email: 'example@mail.com',
        password: 'Password123$'
      })
      .expect(200)
  })

  it('Should return 403 for Already Exists user.', async () => {
    const username = 'Username'
    const email = 'example@mail.com'
    const password = 'Password123$'

    await request(app)
      .post('/api/user/signup')
      .send({
        username,
        email,
        password
      })
      .expect(200)

    await request(app)
      .post('/api/user/signup')
      .send({
        username,
        email,
        password
      })
      .expect(403)
  })
})

describe('User Login', () => {
  it('Should fail if inputs are invalid', async () => {
    const invalidCreds = {
      email: 'wrongEmail',
      password: 'wrongPassword'
    }
    await request(app).post('/api/user/login').send({ invalidCreds }).expect(400)
  })

  it('Should return 200 on success.', async () => {
    const username = 'Username'
    const email = 'example@mail.com'
    const password = 'Password123$'

    await request(app)
      .post('/api/user/signup')
      .send({
        username,
        email,
        password
      })
      .expect(200)

    const res = await request(app)
      .post('/api/user/login')
      .send({
        email: 'example@mail.com',
        password: 'Password123$'
      })
      .expect(200)

    expect(res.body.token).toBeDefined()
  })
})
