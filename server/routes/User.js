const express = require("express") // imports express module
const router = express.Router() // creates new "user" router object
const {Users} = require("../models")
const {Posts} = require("../models")
const {Comments} =  require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken") // destructure and extract sign method from jwt
const {validateAccessToken} = require("../middleware/authorization")

// registration route and handler (maybe add password salting)
router.post("/register", async (req, res) => {
    const {username, password} = req.body
    try {
        const existingUsername = await Users.findOne({
            where: {username: username}
        })
        if (existingUsername) {
            return res.status(400).json({error: "Username Already Exists"})
        }
        const hash = await bcrypt.hash(password, 10)
        const newUser = await Users.create({
            username: username,
            password: hash
        })
        const accessToken = sign({
            username: newUser.username, id: newUser.id
        }, "supersecretkey")
        res.json({
            token: accessToken,
            username: newUser.username,
            id: newUser.id
        })
    } catch (error) {
        res.status(500).json({error: "registration failed"})
    }

})

// login route and handler 
router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await Users.findOne({
            where: {username: username}
        })
        if (!user) {
            return res.status(404).json({error: "User Not Found"})
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({error: "Incorrect Username and Password Combination"})
        }
        const accessToken = sign({
            username: user.username, id: user.id
        }, "supersecretkey")
        res.json({
            token: accessToken,
            id: user.id,
            username: user.username
        })
    } catch (error) {
        res.status(500).json({error: "An Error Occured Processing Your Request"})

    }
})

// token authorization route and handler 
router.get("/auth", validateAccessToken, async (req, res) => { // change to async to detectchanges between token issuance and validation
    try {
        const user = await Users.findOne({
            where: {id: req.user.id},
            attributes: ["username", "id"]
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({error: "Failed To Authorize User"})
    }
    
})

// fetch user profile info by username
router.get("/profile/:username", async (req, res) => {
    const {username} = req.params
    try {
        const user = await Users.findOne({
            where : {username: username},
            attributes: ["id", "username", "biography", "createdAt"],
            include: [
                {
                    model: Users,
                    as: "follower", // fetch followers
                    attributes: ["id", "username", "profilePictureUrl"],
                    through: {attributes: []} // ignore other attributes from follow table
                },
                {
                    model: Users,
                    as: "following", // fetch following
                    attributes: ["id", "username", "profilePictureUrl"],
                    through: {attributes: []} // ignore other attributes from follow table
                },
                {
                    model: Posts,
                    attributes: ["id", "username", "text", "userId", "createdAt"],
                    include: [
                        {
                            model: Comments,
                            attributes: ["id", "text", "username"]
                        }
                    ]
                }
            ]
        })
        if (!user) {
            return res.status(404).json({error: "User Not Found"})
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({error: "Failed To Fetch User Information"})
    }
})

// update profile information
router.put("/profile/:username", validateAccessToken, async (req, res) => {
    const {username} = req.params
    const {newUsername, newBiography} = req.body
    try {
        const user = await Users.findOne({
            where: {username: username}
        })
        if (!user) {
            return res.status(404).json({error: "User Not Found"})
        }
        if (newUsername !== username) {
            const existingUsername = await Users.findOne({
                where: {username: newUsername}
            })
            if (existingUsername) {
                return res.status(400).json({error: "Username Already Taken"})
            }
        }
        user.username = newUsername
        user.biography = newBiography
        await user.save()
        res.json({username: user.username, biography: user.biography, createdAt: user.createdAt}) // deconstruct user object to avoid sending entire instance
    } catch (error) {
        res.status(500).json({error: "Failed To Update Information"})
    }
})

// update password (add salting later)
router.put("/changepassword", validateAccessToken, async (req, res) => {
    const {currentPassword, newPassword} = req.body;
    try {
        const user = await Users.findOne({
            where: {username: req.user.username}
        })
        if (!user) {
            return res.status(404).json({error: "User Not Found"})
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.password)
        if (!passwordMatch) {
            return res.status(400).json({error: "Current Password Is Incorrect"})
        }
        const hash  = await bcrypt.hash(newPassword, 10)
        await Users.update({
            password: hash
        }, {
            where: {username: req.user.username}
        })
        res.status(200).json("Password Changed Succesfully")
    } catch (error) {
        res.status(500).json({error: "Failed To Change Password"})
    }
})


module.exports = router