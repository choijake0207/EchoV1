const express = require("express")
const app = express()
const db = require("./models")

app.use(express.json())

// route mounting 
const userRouter = require("./routes/User")
app.use("/user", userRouter)


db.sequelize.sync().then(()=> {
    app.listen(3001, ()=> {
        console.log("server is up and running")
    })
})

