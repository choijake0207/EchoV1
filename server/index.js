const express = require("express")
const app = express()
const db = require("./models")
const cors = require("cors")

app.use(express.json())
app.use(cors())

// route mounting 
const userRouter = require("./routes/User")
app.use("/user", userRouter)
const followRouter = require("./routes/Follow")
app.use("/follow", followRouter)
const postRouter = require("./routes/Post")
app.use("/post", postRouter)
const commentRouter = require("./routes/Comment")
app.use("/comment", commentRouter)


db.sequelize.sync().then(()=> {
    app.listen(3001, ()=> {
        console.log("server is up and running")
    })
})

