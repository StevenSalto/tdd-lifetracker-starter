const express = require("express");

const router = express.Router();

const Exercise = require("../models/exercise")

/*----- ----- ----- ----- ----- -----*/

router.post("/record-entry", async (req, res, next) => {
    try{
        const exerciseEntry = await Exercise.recordEntry(res.locals.email, req.body)
        return res.status(201).json({ exercise_entry : exerciseEntry })
    } catch(error) {
        next(error)
    }
})

router.get("/list-entries", async (req, res, next) => {
    try{
        const exerciseEntries = await Exercise.listEntries(res.locals.email)
        return res.status(200).json({ exercise_entries: exerciseEntries })
    } catch(error) {
        next(error)
    }
})

/*----- ----- ----- ----- ----- -----*/

module.exports = router