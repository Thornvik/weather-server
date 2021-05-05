import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  console.log('test')
})

app.listen(port, () => {
  console.log('server is up on port ' + port)
})

console.log()
