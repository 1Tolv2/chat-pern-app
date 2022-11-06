import express, { Router } from "express";
import { logInUser, requireLogin } from "../controllers/auth";
import { getAllUsers, handleNewUser, getUser } from "../controllers/users";

const router: Router = express.Router();

router.get("/", requireLogin, getAllUsers);
router.post("/", handleNewUser);
router.post("/auth", logInUser);
router.get("/me", requireLogin, getUser);

export default router;
