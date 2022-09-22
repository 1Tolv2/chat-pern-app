import express, { Router } from 'express';
import { getAllUsers, handleNewUser, getUserById } from '../controllers/index'

const router: Router = express.Router()

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", handleNewUser)

export default router