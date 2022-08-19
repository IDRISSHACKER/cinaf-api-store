const router = require("express").Router()
const con = require("../connnexion")

router.post("/", (req, res, next)=>{

    const {title, description, support} = req.body


    if (title !== undefined && title.length > 1 && description !== undefined && description.length > 1 && support !== undefined && support.length > 1){
        con.connect(function (err) {
            if (err) {
                res.status(502).send({
                    status: 502,
                    message: "Création de l'application impossible",
                    err: { ...err }
                });
                return
            }
            const sql = `INSERT INTO software (title, description, support) VALUES ("${title}", "${description}", "${support}")`;
            con.query(sql, function (err, result) {
                if (err) {
                    res.status(502).send({
                        status: 502,
                        message: "Erreur lors de la creation de votre applications",
                        err: { ...err }
                    });
                    return
                }

                res.status(200).send({
                    status: 200,
                    message: "Appli creer avec success"
                })
            });

        });
    }else{
        res.status(502).send({
            status: 502,
            message: "Verifier si tout les informations de l'application sont correctes"
        })
    }
})

router.get("/", (req, res)=>{
    con.connect(function (err) {
        if (err) {
            res.status(502).send({
                status: 502,
                message: "Une erreur c'est produite lors du chargement de vos applications",
                err: { ...err }
            });
            return
        }
        con.query("SELECT * FROM software", function (err, result, fields) {
            if (err) throw err;
            res.status(200).json(result)
        });
    }); 
})

router.put("/", (req, res)=>{

    const {title, description, support, id} = req.body

    con.connect(function (err) {
        if (err) {
            res.status(502).send({
                status: 502,
                message: "Impossible de mettre à jour l'application",
                err: { ...err }
            });
            return
        }
        var sql = `UPDATE software SET title = "${title}" description = "${description}" support = "${support}" WHERE id = ${id}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.status(502).send({
                    status: 502,
                    message: "Impossible de mettre à jour l'application",
                    err: { ...err }
                });
                return
            }
            if (err) {
                res.status(200).send({
                    status: 200,
                    message: "Application mise à jour avec success",
                    err: { ...err }
                });
                return
            }
        });
    });
})


router.delete("/", (req, res)=>{
    
    const {id} = req.body

    con.connect(function (err) {
        if (err) {
            res.status(502).send({
                status: 502,
                message: "Erreur lors de la supression des articles",
                err: { ...err }
            });
            return
        }
        var sql = `DELETE FROM software WHERE id = ${id}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.status(502).send({
                    status: 502,
                    message: "Erreur lors de la supression des articles",
                    err: { ...err }
                });
                return
            }
                
            res.status(200).send({
                status: 200,
                message: "L'application à été correctement suprimé",
            });
        });
    });
})

module.exports = router
