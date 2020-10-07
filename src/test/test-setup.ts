import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mongo: any

beforeAll(async () => {
  let mongUri: string = process.env.MONGO_URI!

  if (!mongUri) {
    mongo = new MongoMemoryServer()
    mongUri = await mongo.getUri()
  }

  await mongoose.connect(mongUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})
