import express, { Router } from "express";
import { getAllUsers, handleNewUser, getUserById } from "../controllers/users";

const router: Router = express.Router();

router.get("/", getAllUsers); // Get all users
router.post("/", handleNewUser); // Create a new user

router.get("/:id", getUserById); // Get user by id
router.put("/:id") // Update user by id
router.delete("/:id") // Delete user

router.get("/:id/posts") // Get all user's posts

export default router;
