import express, { Router } from 'express'
import { requireLogin } from '../controllers/auth'
import { handleNewPost, getAllPosts, getPostById, editPost, deletePost} from '../controllers/posts'

const router: Router = express.Router()

router.get("/", requireLogin, getAllPosts)    // Get all posts
router.post("/", requireLogin, handleNewPost)     // Create a new post

router.get("/:id", requireLogin, getPostById)  // Get post by id with user and channel
router.put("/:id", requireLogin, editPost)  // Update post by id
router.delete("/:id", requireLogin, deletePost)   // Delete post




export default router