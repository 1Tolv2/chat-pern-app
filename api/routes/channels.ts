import express, { Router } from 'express'
import { getAllChannels, handleNewChannel } from '../controllers/channels'

const router: Router = express.Router()

router.get("/", getAllChannels)
router.post("/", handleNewChannel)

export default router