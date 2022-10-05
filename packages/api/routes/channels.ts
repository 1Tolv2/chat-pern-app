import express, { Router } from 'express'
import { requireLogin } from '../controllers/auth'
import { getAllChannels, getChannelById, handleNewChannel, editChannel, deleteChannel } from '../controllers/channels'

const router: Router = express.Router()

router.get("/", getAllChannels) // Get all channels
router.post("/", handleNewChannel)  // Create a new channel

router.get("/:id", getChannelById)  // Get channel by id with posts with users
router.put("/:id", editChannel)  // Update channel
router.delete("/:id", deleteChannel)  // Delete channel

export default router