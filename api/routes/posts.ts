import express, { Router } from 'express'
import { handleNewPost, getAllPosts} from '../controllers/posts'

const router: Router = express.Router()

router.get("/", getAllPosts)    // Get all posts
router.post("/", handleNewPost)     // Create a new post

router.get("/:id")  // Get post by id
router.put("/:id")  // Update post by id
router.delete("/:id")   // Delete post




export default router