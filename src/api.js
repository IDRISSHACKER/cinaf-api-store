const Router = require("express").Router()
const SoftwareRoute = require("./Routes/Software")

Router.use("/software", SoftwareRoute)

module.exports = Router
