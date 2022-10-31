import express, { Router } from "express";
import {
  getAllChannels,
  getChannelById,
  handleNewChannel,
} from "../controllers/channels";

const router: Router = express.Router();

router.get("/", getAllChannels); // Get all channels
router.post("/", handleNewChannel); // Create a new channel
router.get("/:id", getChannelById); // Get channel by id with posts with users

export default router;
