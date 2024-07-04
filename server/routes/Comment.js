const express = require("express")
const router = express.Router()
const {Comments} = require("../models")
const {validateAccessToken} = require("../middleware/authorization")

// create comment 
router.post("/", validateAccessToken, async (req, res) => {
    const {text, postId} = req.body
    const {username, id} = req.user
    try {
        const response = await Comments.create({
            text: text,
            username: username,
            userId: id,
            postId: postId
        })
        res.json({message: "Comment Posted Successfully", comment: response})
    } catch (error) {
        res.status(500).json({error: "Failed To Post Comment"})
    }
})

// fetch comments by postId
router.get("/:id", async (req, res) => {
    const postId = req.params.id
    try {
        const response = await Comments.findAll({where: {postId: postId}}, {order: [["createdAt", "DESC"]]})
        res.json(response)
    } catch (error) {
        res.status(500).json({error: "Failed To Fetch Comments"})
    }
})



module.exports = router