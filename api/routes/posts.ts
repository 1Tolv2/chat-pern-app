import express, { Router } from 'express'
import { handleNewPost, getAllPosts, getPostById, editPost, deletePost} from '../controllers/posts'

const router: Router = express.Router()

router.get("/", getAllPosts)    // Get all posts
router.post("/", handleNewPost)     // Create a new post

router.get("/:id", getPostById)  // Get post by id with user and channel
router.put("/:id", editPost)  // Update post by id
router.delete("/:id", deletePost)   // Delete post




export default router