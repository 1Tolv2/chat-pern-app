import express, { Router } from "express";
import { requireLogin } from "../controllers/auth";
import {
  getAllServers,
  getServerById,
  handleNewServer,
  addMemberToServer,
} from "../controllers/servers";

const router: Router = express.Router();

router.get("/", requireLogin, getAllServers); // Get all servers
router.post("/", requireLogin, handleNewServer); // Create a new server
router.get("/:id", requireLogin, getServerById); // Get Server by id with channels and users
router.post("/:id/member", requireLogin, addMemberToServer); // Add member to server

export default router;
