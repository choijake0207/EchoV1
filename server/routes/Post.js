const express = require("express")
const router = express.Router()
const {Posts} = require("../models")
const {validateAccessToken} = require("../middleware/authorization")

// create post
router.post("/", validateAccessToken, async (req, res) => {
    const {text} = req.body
    const username = req.user.username
    const id = req.user.id
    try {
        const response = await Posts.create({
            text: text,
            username: username,
            userId: id
        })
        res.json({message:"Post Created Succesfully", postId: response.id})
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
    const id = req.params.id
    try {
        const response = await Posts.findOne({where: {
            id: id
        }})
        res.json(response)
    } catch (error) {
        res.status(500).json({error: "Failed To Fetch Post"})
    }
})

// delete post
router.delete("/:id", validateAccessToken, async (req, res) => {
    const postId = req.params.id
    const userId = req.user.id
    try {
        const post = await Posts.findOne({where: {id: postId, userId: userId}})
        if (!post) {
            return res.status(404).json({error: "Post Not Found"})
        }
        if (post.userId !== userId) {
            return res.status(400).json({error: "You Are Not Authorized To Delete This Post"})
        }
        await Posts.destroy({where: {id: postId}})
        res.json("Post Deleted Succesfully")
    } catch (error) {
        res.status(500).json({error: "Failed To Delete Post"})
    }
})



module.exports = router