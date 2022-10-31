import express, { Router } from "express";
import { requireLogin } from "../controllers/auth";
import { handleNewPost, getAllPosts, getPostById } from "../controllers/posts";

const router: Router = express.Router();

router.get("/", requireLogin, getAllPosts); // Get all posts
router.post("/", requireLogin, handleNewPost); // Create a new post
router.get("/:id", requireLogin, getPostById); // Get post by id with user and channel

export default router;
