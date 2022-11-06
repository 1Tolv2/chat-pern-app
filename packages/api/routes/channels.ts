import express, { Router } from "express";
import {
  getAllChannels,
  getChannelById,
  handleNewChannel,
} from "../controllers/channels";

const router: Router = express.Router();

router.get("/", getAllChannels);
router.post("/", handleNewChannel);
router.get("/:id", getChannelById);

export default router;
