const db = require("../db")
const bcrypt = require("bcrypt")

const {BadRequestError, UnauthorizedError} = require("../utils/errors")
const {BCRYPT_WORK_FACTOR} = require("../config")

class User {
    static async register(credentials) {
        const requiredFields = ["email", "password", "firstName", "lastName", "username"];
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })

        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser){
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);

        const lowerCaseEmail = credentials.email.toLowerCase();

        const result = await db.query(
            `INSERT INTO users (password, first_name, last_name, email, username)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, password, first_name AS "firstName", last_name AS "lastName", email, username, date;`,
            [hashedPassword, credentials.firstName, credentials.lastName, lowerCaseEmail, credentials.username]
        )

        const user = result.rows[0]
        return user
    }

    static async login(credentials) {
        const requiredFields = ["email", "password"];
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })

        const user = await User.fetchUserByEmail(credentials.email)
        if(user){
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if(isValid) {
                return user;
            }
        }
        
        throw new UnauthorizedError("Invalid username/password")
    }


// HELPER METHOD
    static async fetchUserByEmail(email) {
        if(!email) {
            throw new BadRequestError("No email provided")
        }
        const query = 'SELECT * FROM users WHERE email = $1';

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]
        console.log(user)
        return user;
    }
}

module.exports = User