import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

//require("..src/routes/index")(app)

app.listen(process.env.PORT || 3000)
console.log('server on port', process.env.PORT)