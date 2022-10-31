import express, { Router } from "express";
import {
  getAllServers,
  getServerById,
  handleNewServer,
  addMemberToServer,
} from "../controllers/servers";

const router: Router = express.Router();

router.get("/", getAllServers); // Get all servers
router.post("/", handleNewServer); // Create a new server
router.get("/:id", getServerById); // Get Server by id with channels and users
router.post("/:id/member", addMemberToServer); // Add member to server

export default router;
