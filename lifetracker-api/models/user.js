const db = require("../db")
const bcrypt = require("bcrypt")

const {BadRequestError, UnauthorizedError} = require("../utils/errors")
const {BCRYPT_WORK_FACTOR} = require("../config")

class User {
    static async register(credentials) {
        // Check if required fields for db query are present
        // If a field is missing, throw a BadRequestError
        const requiredFields = ["email", "username", "firstName", "lastName", "password"];
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })
        // Check if email is already in use
        // If email is in use, throw a BadRequestError
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser){
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }
        // Encrypt user password. 
        // Login calls will compare encrypted password submissions against this hash for user login validation.
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);

        const lowerCaseEmail = credentials.email.toLowerCase();
        // Make a db query. Store db query results in 'result'.
        const result = await db.query(
            `INSERT INTO users (password, first_name, last_name, email, username)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, password, first_name AS "firstName", last_name AS "lastName", email, username, date;`,
            [hashedPassword, credentials.firstName, credentials.lastName, lowerCaseEmail, credentials.username]
        )
        // Extract user data from query results and store it in 'user'.
        const user = result.rows[0]

        return user
    }

    static async login(credentials) {
        // Check if required fields are present
        // If a field is missing, throw a BadRequestError
        const requiredFields = ["email", "password"];
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })

        const user = await User.fetchUserByEmail(credentials.email)
        /** 
         * If user with input credentials exists, compare submitted password to the
         * stored password for said user in db. If they are the same, return user info.
         * Should anything go wrong, throw an UnauthorizedError.
        */
        if(user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if(isValid) {
                return user
            }
        }
        
        throw new UnauthorizedError("Invalid username/password")
    }

    // Helper method: Looks up users in db based on email.
    static async fetchUserByEmail(email) {
        // Checks for email. If no email is passed, throw a BadRequestError.
        if(!email) {
            throw new BadRequestError("No email provided")
        }
        const query = 'SELECT * FROM users WHERE email = $1'

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]
        
        return user
    }
}

module.exports = User