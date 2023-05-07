import express from 'express'
import cors from 'cors'
import dotenf from 'dotenv'

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

//require("..src/routes/index")(app)

app.listen(process.env.PORT)
console.log('server on port', process.env.PORT)