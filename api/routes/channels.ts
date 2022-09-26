import express, { Router } from 'express'
import { getAllChannels, handleNewChannel, getAllChannelPosts } from '../controllers/channels'

const router: Router = express.Router()

router.get("/", getAllChannels)
router.post("/", handleNewChannel)
router.get("/posts", getAllChannelPosts)

export default router