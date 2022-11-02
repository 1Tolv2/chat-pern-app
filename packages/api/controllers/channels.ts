import { Request, Response } from "express";
import { requiredFieldsCheck } from ".";
import {
  createChannel,
  findAllChannels,
  findChannelById,
} from "../models/Channel";
import { findAllPostsByChannel } from "../models/Post";

export const handleNewChannel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, [
    "name",
    "serverId",
    "description",
  ]);
  if (missingFields.length === 0) {
    try {
      const { name, server_id, description } = req.body;
      const channel = await createChannel({
        server_id,
        name: name.toLowerCase(),
        description,
      });
      res.status(201).json({
        channel,
        message: "New channel created",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else if (missingFields.length > 0) {
    res.status(400).json({
      error: "Missing required fields",
      missingFields,
    });
  } else {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllChannels = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const channels = await findAllChannels();
    res.json(channels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getChannelById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const channel = await findChannelById(req.params.id);
    channel.posts = await findAllPostsByChannel(req.params.id);
    res.json(channel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
