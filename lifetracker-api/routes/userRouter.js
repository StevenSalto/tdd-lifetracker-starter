const express = require("express");

const router = express.Router();

const User = require("../models/user")

const { createUserJwt } = require("../utils/tokens")

/*----- ----- ----- ----- ----- -----*/

router.post("/register", async (req, res, next) => {
    try{
        const user = await User.register(req.body)
        const token = createUserJwt(user)
        return res.status(201).json({ token })
    } catch(error) {
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({ token })
    } catch(error) {
        next(error)
    }
})

/*----- ----- ----- ----- ----- -----*/

module.exports = router