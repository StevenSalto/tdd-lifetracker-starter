const db = require("../db")
const bcrypt = require("bcrypt")

const {BadRequestError, UnauthorizedError} = require("../utils/errors")


class Nutrition {
    static async recordNutrition(data) {
        const requiredFields = ["user_id", "category", "quantity", "calories", "image_url"];
        requiredFields.forEach(field => {
            if (!data.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in req body`)
            }
        })

        const result = await db.query(
            `INSERT INTO nutrition (user_id, category, quantity, calories, image_url)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, user_id, category, quantity, calories, image_url AS "imageUrl", date;`,
            [data.user_id, data.category, data.quantity, data.calories, data.image_url]
        )

        const nutritionItem = result.rows[0]
        return nutritionItem
    }

    static async listNutrition() {

        const result = await db.query(
            `SELECT * FROM nutrition`
        )
        console.log(result)
        const nutritionItem = result.rows
        return nutritionItem
    }
}

module.exports = Nutrition