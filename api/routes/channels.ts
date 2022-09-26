import express, { Router } from 'express'
import { getAllChannels, handleNewChannel, getChannel} from '../controllers/channels'

const router: Router = express.Router()

router.get("/", getAllChannels)
router.post("/", handleNewChannel)
router.get("/:id/posts", getChannel)

export default router