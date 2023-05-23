import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.get('/health', (req, res) => res.send('Server is up and running!'))

routes(app)

app.listen(PORT)
console.log('server running on port', PORT)