import express, { Router } from "express";
import { requireLogin } from "../controllers/auth";
import { handleNewPost, getAllPosts, getPostById } from "../controllers/posts";

const router: Router = express.Router();

router.get("/", requireLogin, getAllPosts);
router.post("/", requireLogin, handleNewPost);
router.get("/:id", requireLogin, getPostById);

export default router;
