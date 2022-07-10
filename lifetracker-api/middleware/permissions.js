const Nutrition = require("../models/nutrition")
const { BadRequestError, ForbiddenError } = require("../utils/errors")

// Prerequisite: User is authenticated.
// Goal: Ensures user is owner of data.
// Returns: Error if user does not own data
const authorizeUser = async (req, res, next) => {
    try {
        const { user_id } = res.locals
        
    } catch(error) {
        return next(error)
    }
}

module.exports = {
    authenticateUser
}