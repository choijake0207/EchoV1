const express = require("express") // imports express module
const router = express.Router() // creates new "user" router object
const {Users} = require("../models")
const bcrypt = require("bcrypt")

// registration route and handler
router.post("/register", async (req, res) => {
    const {username, password} = req.body
    try {
        const hash = await bcrypt.hash(password, 10)
        const newUser = await Users.create({
            username: username,
            password: hash
        })
    } catch (error) {
        res.status(500).json({error: "registration failed"})
    }

})

// login route and handler 
router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await Users.findOne({where: {username: username}})
        if (!user) {
            return res.status(404).json({error: "User Not Found"})
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({error: "Incorrect Username and Password Combination"})
        }
        res.json("you logged in!")
    } catch (error) {
        res.status(500).json({error: "An Error Occured Processing Your Request"})

    }
})



module.exports = router