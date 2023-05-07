const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

//require("..src/routes/index")(app)

app.listen(process.env.PORT)
console.log('server on port', process.env.PORT)