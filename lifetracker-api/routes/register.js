const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register", async (req, res, next) => {
    try{
        const user = await User.register(req.body)
        return res.status(201).json({ user })
    } catch(err) {
        next(err);
    }
})

module.exports = router;