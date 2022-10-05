import express, { Router } from "express";
import { logInUser, requireLogin } from "../controllers/auth";
import {
  getAllUsers,
  handleNewUser,
  getUserById,
  editUser,
  deleteUser,
} from "../controllers/users";

const router: Router = express.Router();

router.get("/", requireLogin, getAllUsers); // Get all users
router.post("/", handleNewUser); // Create a new user
router.post("/auth", logInUser); // Login a user
router.get("/:id", requireLogin, getUserById); // Get user by id with posts and servers
router.put("/:id", requireLogin, editUser); // Update user by id
router.delete("/:id", requireLogin, deleteUser); // Delete user

export default router;
