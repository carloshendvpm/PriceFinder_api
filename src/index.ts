import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

routes(app)

app.listen(process.env.PORT || 3000)
console.log('server on port', process.env.PORT)