const express = require("express")
const router = express.Router()
const {Posts} = require("../models")
const {validateAccessToken} = require("../middleware/authorization")

// create post
router.post("/", validateAccessToken, async (req, res) => {
    const {text} = req.body
    const username = req.user.username
    try {
        const response = await Posts.create({
            text: text,
            username: username
        })
        res.json("Post Created Succesfully")
    } catch (error) {
        res.status(500).json({error: "Failed To Create Post"})
    }
})

// fetch all posts for home feed
router.get("/", async (req, res) => {
    try {
        const response = await Posts.findAll({order: [["createdAt", "DESC"]]})
        res.json(response)
    } catch (error) {
        res.status(500).json({error: "Failed To Fetch Posts"})
    }

})

// fetch post by id for single view
router.get("/:id", async (req, res) => {
    const postId = req.params.id
    try {
        const response = await Posts.findOne({where: {
            id: postId
        }})
        res.json(response)
    } catch (error) {
        res.status(500).json({error: "Failed To Fetch Post"})
    }
})


module.exports = router