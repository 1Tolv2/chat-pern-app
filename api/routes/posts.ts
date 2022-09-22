import express, { Router } from 'express'
import { handleNewPost } from '../controllers/posts'

const router: Router = express.Router()

router.get("/", (req, res) => {
    res.json({message: "hello"})
})
router.post("/", handleNewPost)

export default router