import { ChannelItem } from "@chat-app-typescript/shared";
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
  const missingFields = requiredFieldsCheck(req.body, ["name", "serverId"]);
  if (missingFields.length > 0) {
    let channel: ChannelItem | null = null;
    try {
      const { name, server_id } = req.body;
      channel = await createChannel(
        server_id,
        name.toLowerCase(),
        req.body.description || ""
      );
    } catch (err) {
      console.error(err);
    }

    res.status(201).json({
      channel,
      message: "New channel created",
    });
  } else if (missingFields.length === 0) {
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
