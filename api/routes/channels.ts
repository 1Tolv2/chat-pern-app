import express, { Router } from 'express'
import { getAllChannels, handleNewChannel, getChannel, getChannelPosts,getChannelUsers } from '../controllers/channels'

const router: Router = express.Router()

router.get("/", getAllChannels) // Get all channels

router.post("/", handleNewChannel)  // Create a new channel

router.get("/:id", getChannel)  // Get channel by id with all info
router.put("/:id")  // Update channel by id
router.delete("/:id")  // Delete channel

router.get("/:id/posts", getChannelPosts) // Get all posts in a channel
router.get("/:id/users", getChannelUsers)  // Get all users in a channel

export default router