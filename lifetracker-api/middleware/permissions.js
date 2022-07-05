const User = require("../models/user")
const { BadRequestError, ForbiddenError } = require("../utils/errors")

const authenticateUser = async (req, res, next) => {
    try {
        const { user } = res.locals
        const { userId } = req.params
        const user = await User.
    }
}