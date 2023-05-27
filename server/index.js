const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const PORT = 8080

dotenv.config()
app.use(express.json({ limit: "25mb" })); //for parsing application/json and setting limit for image size
//for CORS requests
app.use(cors())
//for request monitoring
app.use(morgan())

//database connection
const URL = process.env.MONGODB_URL
mongoose.connect(URL).then(() => {
    console.log("DB Connected")
}).catch((error) => {
    console.log(`DB Connection failed, ${error}`)
})

//routes
app.use("/api/auth", require("./routes/Auth"))
app.use("/api/image", require("./routes/Image"))

//listening server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})