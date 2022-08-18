const router = require("express").Router()

router.get("/app", (req, res)=>{
    res.send("List of application")
})


module.exports = router
