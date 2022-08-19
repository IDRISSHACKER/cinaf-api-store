const Router = require("express").Router()
const SoftwareRoute = require("./Routes/Software")
const SoftwaresRoute = require("./Routes/Softwares")

Router.use("/software", SoftwareRoute)
Router.use("/softwares", SoftwaresRoute)

module.exports = Router
