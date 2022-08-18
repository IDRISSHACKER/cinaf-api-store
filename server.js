const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const Application = require("./src/Routes/Application")
const con = require("./src/connnexion")

const SERVER_PORT = 7000

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res)=>{
    res.status(200).send("Api store de cinaf")
})

app.use("/api", Application)


app.listen(SERVER_PORT, ()=>{
    console.log(`CINAF API STORE is running on port ${SERVER_PORT}`)
})
