import { app } from 'app'
import { connectToDB } from './config/database'

let server
let port = process.env.PORT || 9000

async function main() {
  await connectToDB()

  server = await app.listen(port)
  console.log(` \n 🚀 Server listening on port ${port}`)
}

main()

export default { server }
