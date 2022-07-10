const jwt = require("jsonwebtoken")
const db = require("../db")

const { KEY } = require("../config")

const { UnauthorizedError } = require("../utils/errors")

const jwtFrom = ({headers}) => {
    if(headers?.authorization) {
        const[scheme, token] = headers.authorization.split(" ")
        if (scheme.trim() === "Bearer") {
            return token
        }
    }

    return undefined
}   

const extractUserFromJwt = (req, res, next) => {
    try {
        const token = jwtFrom(req)
        if (token) {
            res.locals.email = jwt.verify(token, KEY).email
        }
        return next()
    } catch(error) {
        return next()
    }
}

const requireAuthenticatedUser = async (req, res, next) => {
    try {
        const { email } = res.locals
        if (!email) {
            throw new UnauthorizedError();
        }

        const result = await db.query(
            `SELECT * FROM users WHERE email=$1`,
            [email]
        )
       
        if(result.rows.length == 0) {
            throw new UnauthorizedError();
        }
        
        return next()
    } catch(error) {
        return next(error)
    }
}

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser
}