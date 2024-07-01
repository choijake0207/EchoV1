const express = require("express")
const router = express.Router()
const {Users} = require("../models")
const {Follows} = require("../models")
const {validateAccessToken} = require("../middleware/authorization")

// follow/unfollow user
router.post("/:id", validateAccessToken, async (req, res) => {
    try {
        const followerId = req.user.id;
        const followingId = req.params.id

        // check for prexisting relationship
        const existingFollow = await Follows.findOne({where: {followerId, followingId}})
        if (existingFollow) { // destroy existing follow
            await existingFollow.destroy()
            return res.status(200).json("Unfollowed Succesfully")
        } else {
            await Follows.create({followerId, followingId})
            return res.status(200).json("Followed Succesfully")
        }
    } catch (error) {
        res.status(500).json({error: "Server Error"})
    }
} )


