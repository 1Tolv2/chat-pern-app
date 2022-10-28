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
      channel = await createChannel({
        name: name.toLowerCase(),
        server_id,
      } as ChannelItem);
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
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

export const getAllChannels = async (
  req: Request,
  res: Response
): Promise<void> => {
  const channels = await findAllChannels();
  res.json(channels);
};

export const getChannelById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const channel = await findChannelById(parseInt(req.params.id));
  channel.posts = await findAllPostsByChannel(parseInt(req.params.id));
  res.json(channel);
};

export const editChannel = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ channel: { message: "Channel updated" } });
};

export const deleteChannel = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ message: "Channel deleted" });
};
