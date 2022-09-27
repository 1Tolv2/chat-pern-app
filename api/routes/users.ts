import express, { Router } from "express";
import { getAllUsers, handleNewUser, getUserById, editUser, deleteUser } from "../controllers/users";

const router: Router = express.Router();

router.get("/", getAllUsers); // Get all users
router.post("/", handleNewUser); // Create a new user

router.get("/:id", getUserById); // Get user by id with posts and servers
router.put("/:id", editUser) // Update user by id
router.delete("/:id", deleteUser) // Delete user

export default router;
