import express, { Router } from "express";
import { requireLogin } from "../controllers/auth";
import {
  getAllServers,
  getServerById,
  handleNewServer,
  addMemberToServer,
} from "../controllers/servers";

const router: Router = express.Router();

router.get("/", requireLogin, getAllServers);
router.post("/", requireLogin, handleNewServer);
router.get("/:id", requireLogin, getServerById);
router.post("/:id/member", requireLogin, addMemberToServer);

export default router;
