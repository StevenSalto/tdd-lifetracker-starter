const express = require("express");
const router = express.Router();
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")
const User = require("../models/user")
const Exercise = require("../models/exercise")
const Nutrition = require("../models/nutrition")

router.post("/user", async (req, res, next) => {
    try{
        const user = await User.register(req.body)
        const token = createUserJwt(user)
        return res.status(201).json({ user, token })
    } catch(error) {
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({ user, token })
    } catch(error) {
        next(error)
    }
})

   

router.post("/exercise", async (req, res, next) => {
    try {
        const exercise = await Exercise.recordExercise(req.body)
        return res.status(201).json({ exercise })
    } catch(error) {
        next(error)
    }
})

router.post("/nutrition", async (req, res, next) => {
    try{
        const nutrition = await Nutrition.recordNutrition(req.body)
        return res.status(201).json({ nutrition })
    } catch(error) {
        next(error)
    }
})

router.get("/nutrition-list", async (req,res,next) => {
    try{
        const nutritionList = await Nutrition.listNutrition()
        return res.status(200).json({ nutritionList })
    } catch(error) {
        next(error)
    }
})

module.exports = router;