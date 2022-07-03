const jwt = require("jsonwebtoken")
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
            res.local.user = jwt.verify(token, KEY)  
        }
    } catch(error) {
        return next()
    }
}

const requireAuthenticatedUser = (req, res, next) => {
    try {
        const {user} = res.locals
        if (!user?.email) {
            throw new UnauthorizedError();
        }
    } catch(err) {
        return next(error)
    }
}

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser
}