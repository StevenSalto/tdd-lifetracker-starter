const express = require("express")
const cors = require("cors")
const morgan = require("morgan") 

const security = require("./middleware/security")

const userRouter = require("./routes/userRouter")
const exerciseRouter = require("./routes/exerciseRouter")
const nutritionRouter = require("./routes/nutritionRouter")
const sleepRouter = require("./routes/sleepRouter")

const {PORT} = require("./config")

const {NotFoundError} = require("./utils/errors")

/*----- ----- ----- ----- ----- -----*/

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan())

app.use('/user', userRouter)

app.use(security.extractUserFromJwt)

app.use('/exercise', security.requireAuthenticatedUser, exerciseRouter)
app.use('/nutrition', security.requireAuthenticatedUser, nutritionRouter)
app.use('/sleep', security.requireAuthenticatedUser, sleepRouter)

/** 
 * I'm probably overlooking something basic but why doesn't
 * 'new NotFoundError()' replace any error raised before it?
 * Maybe next() stores what it's passed in *somewhere* 
 * and future use() calls only execute if that *somewhere* 
 * is empty?
 * 
 * Must google at some point. Works though.
*/ 
app.use((req, res, next) => {
    return next(new NotFoundError())
})
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: {message, status}, 
    })
})

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
})