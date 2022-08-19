const router = require("express").Router()
const con = require("./../connnexion")
const { generateHttpResponse, getHttpResponse, lostConnexionToDbMsg } = require("./../func/generateResponseMsg")

router.get("/", (req, res) => {
    con.connect(function (err) {
        if (err) {
            lostConnexionToDbMsg(res, err)
            return
        }
        con.query(`SELECT 
            software.id, 
            software.title, 
            software.description, 
            support.title as supportTitle,
            support.icon as supportIcon  
            FROM software
            LEFT JOIN support
            ON software.fkSupport = support.id;`,
            function (err, result, fields) {
                if (err) generateHttpResponse(res, "get", "Une erreur c'est produite lors du chargement de vos applications", true, err);
                res.status(200).json(result)
            });
    });
})

module.exports = router