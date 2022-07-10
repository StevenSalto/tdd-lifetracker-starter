const express = require("express");

const router = express.Router();

const Sleep = require("../models/sleep")

/*----- ----- ----- ----- ----- -----*/

router.post("/record-entry", async (req, res, next) => {
    try{
        const sleepEntry = await Sleep.recordEntry(res.locals.email, req.body)
        return res.status(201).json({ sleep_entry : sleepEntry })
    } catch(error) {
        next(error)
    }
})

router.get("/list-entries", async (req, res, next) => {
    try{
        const sleepEntries = await Sleep.listEntries(res.locals.email)
        return res.status(200).json({ sleep_entries: sleepEntries })
    } catch(error) {
        next(error)
    }
})

/*----- ----- ----- ----- ----- -----*/

module.exports = router