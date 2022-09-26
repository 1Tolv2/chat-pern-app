import express, { Router } from 'express'
import { handleNewPost, getAllPosts} from '../controllers/posts'

const router: Router = express.Router()

router.get("/", getAllPosts)
router.post("/", handleNewPost)

export default router