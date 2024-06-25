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

module.exports = router