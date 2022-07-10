const express = require("express");

const router = express.Router();

const Nutrition = require("../models/nutrition")

/*----- ----- ----- ----- ----- -----*/

router.post("/record-entry", async (req, res, next) => {
    try{
        const nutritionEntry = await Nutrition.recordEntry(res.locals.email, req.body)
        return res.status(201).json({ nutrition_entry: nutritionEntry })
    } catch(error) {
        next(error)
    }
})

router.get("/list-entries", async (req, res, next) => {
    try{
        const nutritionEntries = await Nutrition.listEntries(res.locals.email)
        return res.status(200).json({ nutrition_entries: nutritionEntries })
    } catch(error) {
        next(error)
    }
})

/*----- ----- ----- ----- ----- -----*/

module.exports = router