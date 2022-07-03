const jwt = require("jsonwebtoken")
const {KEY} = require("../config")

const generateToken = (data) => jwt.sign(data, KEY, { expiresIn: "24h" })

const createUserJwt = (user) => {
    const payload = {
        email: user.email
    }

    return generateToken(payload)
}


const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, KEY)
        return decoded
    } catch(error) {
        return {}
    }
}