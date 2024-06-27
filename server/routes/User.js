const express = require("express") // imports express module
const router = express.Router() // creates new "user" router object
const {Users} = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken") // destructure and extract sign method from jwt
const {validateAccessToken} = require("../middleware/authorization")

// registration route and handler
router.post("/register", async (req, res) => {
    const {username, password} = req.body
    try {
        const existingUsername = await Users.findOne({where: {username: username}})
        if (existingUsername) {
            return res.status(400).json({error: "Username Already Exists"})
        }
        const hash = await bcrypt.hash(password, 10)
        const newUser = await Users.create({
            username: username,
            password: hash
        })
        const accessToken = sign({username: newUser.username, id: newUser.id}, "supersecretkey")
        res.json(accessToken)
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
        const accessToken = sign({username: user.username, id: user.id}, "supersecretkey")
        res.json(accessToken)
    } catch (error) {
        res.status(500).json({error: "An Error Occured Processing Your Request"})

    }
})

// token authorization route and handler 
router.get("/auth", validateAccessToken, (req, res) => {
    res.json(req.user)
})

// fetch user profile info by username
router.get("/profile/:username", async (req, res) => {
    const {username} = req.params
    try {
        const user = await Users.findOne({
            where : {username: username},
            attributes: ["username", "biography"]
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({error: "Failed To Fetch User Information"})
    }
})

module.exports = router