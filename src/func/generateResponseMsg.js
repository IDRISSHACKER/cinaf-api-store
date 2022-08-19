
const successCodeList = {
    post: 201,
    get: 200,
    put: 204,
    delete: 204
}

const errorCodeList = {
    post: 400,
    get: 404,
    put: 404,
    delete: 404,
    serverErr: 500
}

/**
 * 
 * @param String res
 * @param String type 
 * @param String msg 
 * @param Boolean isErr 
 * @param Object err 
 * @returns Object
 */
const generateHttpResponse = (res,  type="post", msg, isErr = false, err = {}) => {
    
    const httpCode = successCodeList[type]
    const errhttpCode = errorCodeList[type]

    
    if(!isErr){
        return res.status(httpCode).json({
                code: httpCode,
                message: msg
            })
    }else{
        return res.status(errhttpCode).json({
                code: errhttpCode,
                message: msg,
                err: err
            }) 
    }
}

/**
 * 
 * @param String type 
 * @param {Boolean} Boolean isErr 
 * @returns Number
 */
const getHttpResponse = (type = "post", isErr=false) =>  !isErr ? successCodeList[type] : errorCodeList[type]

/**
 * 
 * @param {*} res 
 * @param {*} err 
 * @returns 
 */
const lostConnexionToDbMsg = (res, err,) => {
    return generateHttpResponse(res = res, type = "serverErr", msg = "Erreur de connexion à votre base de donnée", isErr = true, err)
}

/**
 * 
 * @param {*} err 
 * @param {*} isRequest
 */

const lostConnexionToDbDebugMode = (err, isRequest = false) => {
    console.log({
        "message": !isRequest ? "Une erreur c'est produite lors de la connexion à la base de données" : "Erreur dans votre requete",
        "error": err
    })
    return
}


module.exports = { generateHttpResponse, getHttpResponse, lostConnexionToDbMsg, lostConnexionToDbDebugMode }
