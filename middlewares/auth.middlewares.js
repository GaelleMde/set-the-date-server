const jwt = require("jsonwebtoken")


function verifyToken(req, res, next) {

    console.log("ejecutando middleware")

    try {
        const tokenText = req.headers.authorization
        console.log(tokenText)
        const token = tokenText.split(" ")[1]

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)

        console.log(payload)
        req.payload = payload // pasamos la info del usuario que hizo esta llamada a la ruta
        next()

    } catch (error) {
        res.status(401).json({errorMessage: "Token does not exist or is not valid"})
    }

    
}

module.exports = verifyToken