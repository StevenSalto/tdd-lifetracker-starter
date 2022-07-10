const db = require("../db")

const User = require("./user")

const {BadRequestError} = require("../utils/errors")

class Nutrition {
    static async recordEntry(email, data) {
        const requiredFields = ["name", "category", "quantity", "calories", "image_url"];
        requiredFields.forEach(field => {
            if (!data.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })

        const user = await User.fetchUserByEmail(email)

        const result = await db.query(
            `INSERT INTO nutrition (user_id, name, category, quantity, calories, image_url)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, user_id, name, category, quantity, calories, image_url AS "imageUrl", date;`,
            [user.id, data.name, data.category, data.quantity, data.calories, data.image_url]
        )

        const nutritionItem = result.rows[0]

        return nutritionItem
    }

    static async listEntries(email) {
        const user = await User.fetchUserByEmail(email)

        const result = await db.query(
            `SELECT * FROM nutrition WHERE user_id=$1`,
            [user.id]
        )

        const nutritionItem = result.rows

        return nutritionItem
    }
}

module.exports = Nutrition