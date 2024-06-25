const express = require("express")
const app = express()
const db = require("./models")
const cors = require("cors")

app.use(express.json())
app.use(cors())

// route mounting 
const userRouter = require("./routes/User")
app.use("/user", userRouter)


db.sequelize.sync().then(()=> {
    app.listen(3001, ()=> {
        console.log("server is up and running")
    })
})

