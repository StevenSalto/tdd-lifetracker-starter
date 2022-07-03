const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const {PORT} = require("./config")
const registerRoute = require("./routes/register")
const db = require("./db")
const security = require("./middleware/security")
const app = express()

app.use(express.json())


app.use(security.extractUserFromJwt)

app.use('/register', registerRoute)



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