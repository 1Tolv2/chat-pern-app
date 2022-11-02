import express, { Router } from "express";
import { logInUser, requireLogin } from "../controllers/auth";
import { getAllUsers, handleNewUser, getUser } from "../controllers/users";

const router: Router = express.Router();

router.get("/", requireLogin, getAllUsers); // Get all users
router.post("/", handleNewUser); // Create a new user
router.post("/auth", logInUser); // Login a user
router.get("/me", requireLogin, getUser); // Get user by id with posts and servers

export default router;
