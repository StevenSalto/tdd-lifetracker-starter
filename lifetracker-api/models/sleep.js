const db = require("../db")

const User = require("./user")

const {BadRequestError} = require("../utils/errors")


class Sleep {
    static async recordEntry(email, data) {
        const requiredFields = ["start_time", "end_time"];
        requiredFields.forEach(field => {
            if (!data.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })

        const user = await User.fetchUserByEmail(email)

        const result = await db.query(
            `INSERT INTO sleep (user_id, start_time, end_time)
             VALUES ($1, $2, $3)
             RETURNING id, user_id, start_time, end_time, date;`,
            [user.id, data.start_time, data.end_time]
        )

        const sleepItem = result.rows[0]

        return sleepItem
    }

    static async listEntries(email) {
        const user = await User.fetchUserByEmail(email)

        const result = await db.query(
            `SELECT * FROM sleep WHERE user_id=$1`,
            [user.id]
        )

        const sleepItem = result.rows

        return sleepItem
    }
}

module.exports = Sleep