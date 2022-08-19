const router = require("express").Router()
const con = require("./../connnexion")
const {generateHttpResponse, getHttpResponse, lostConnexionToDbMsg} = require("./../func/generateResponseMsg")


router.post("/", (req, res, next)=>{

    const {title, description, support} = req.body


    if (title !== undefined && title.length > 1 && description !== undefined && description.length > 1 && support !== undefined && support.length > 0){
        con.connect(function (err) {
            if (err) {
                lostConnexionToDbMsg(res, err)
                return
            }
            const sql = `INSERT INTO software (title, description, fkSupport) VALUES ("${title}", "${description}", ${support})`;
            con.query(sql, function (err, result) {
                if (err) {
                    res.status(502).json({
                        status: 502,
                        message: "Erreur lors de la creation de votre applications",
                        err: { ...err }
                    });
                    generateHttpResponse(res = res, type = "post", msg = "Erreur lors de la creation de votre applications", isErr = true, err)
                    return
                }

                generateHttpResponse(res = res, type = "post", msg = "Appli creer avec success")
            });

        });
    }else{
        generateHttpResponse(res = res, type = "post", msg = "Erreur de validation de votre demande", isErr = true, err = {
            err: [
                "Verifier si tout les informations de l'application sont correctes"
            ]
        })
    }
})


router.put("/", (req, res)=>{

    const {title, description, support, id} = req.body

    con.connect(function (err) {
        if (err) {
            lostConnexionToDbMsg(res, err)
            return
        }
        var sql = `UPDATE software SET title = "${title}" description = "${description}" support = "${support}" WHERE id = ${id}`;
        con.query(sql, function (err, result) {
            if (err) {
                generateHttpResponse(res = res, type = "put", msg = "Impossible de mettre à jour l'application", isErr = true, err = err);
                return
            }
            generateHttpResponse(res = res, type = "put", msg = "Appli creer avec success")
        });
    });
})


router.delete("/", (req, res)=>{
    
    const {id} = req.body

    con.connect(function (err) {
        if (err) {
            lostConnexionToDbMsg(res, err)
            return
        }
        var sql = `DELETE FROM software WHERE id = ${id}`;
        con.query(sql, function (err, result) {
            if (err) {
                generateHttpResponse(res = res, type = "delete", msg = "Erreur lors de la supression des articles", isErr = true, err = err);
                return
            }  
            generateHttpResponse(res = res, type = "put", msg = "L'application à été correctement suprimé")
        });
    });
})

router.get("/:software", (req, res) => {
    const {software} = req.params
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
            ON software.fkSupport = support.id
            WHERE software.id = ${software}`, function (err, result, fields) {
                if (err) generateHttpResponse(res, "get", "Une erreur c'est produite lors de la recuperation de l'application en base de donnée", true, err);
                res.status(200).json(result)
            });
    });
})

module.exports = router
