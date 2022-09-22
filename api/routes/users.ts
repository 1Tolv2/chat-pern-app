import express, { Router } from 'express';
import { getAllUsers, handleNewUser } from '../controllers/index'

const router: Router = express.Router()

router.get("/", getAllUsers);
router.post("/", handleNewUser)

export default router