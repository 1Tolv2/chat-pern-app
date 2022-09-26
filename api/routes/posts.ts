import express, { Router } from 'express'
import { handleNewPost, getAllPostsByChannelId, getAllPosts} from '../controllers/posts'

const router: Router = express.Router()

router.get("/", getAllPosts)
router.post("/", handleNewPost)
router.get("/:id", getAllPostsByChannelId)

export default router