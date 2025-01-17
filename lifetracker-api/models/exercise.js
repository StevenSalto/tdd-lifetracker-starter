const db = require("../db")

const User = require("./user")

const {BadRequestError} = require("../utils/errors")


class Exercise {
    static async recordEntry(email, data) {
        const requiredFields = ["name", "category", "duration", "intensity"];
        requiredFields.forEach(field => {
            if (!data.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })

        const user = await User.fetchUserByEmail(email)

        const result = await db.query(
            `INSERT INTO exercise (user_id, name, category, duration, intensity)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, user_id, name, category, duration, intensity, date;`,
            [user.id, data.name, data.category, data.duration, data.intensity]
        )

        const exerciseItem = result.rows[0]

        return exerciseItem
    }

    static async listEntries(email) {
        const user = await User.fetchUserByEmail(email)

        const result = await db.query(
            `SELECT * FROM exercise WHERE user_id=$1`,
            [user.id]
        )

        const exerciseItem = result.rows

        return exerciseItem
    }
}

module.exports = Exercise