import { Request, Response } from "express";
import {
  createChannel,
  findAllChannels,
  findChannelById,
} from "../models/Channel";
import { findAllPostsByChannel } from "../models/Post";
import responseMessages from "../global/responseMessages";
import { requiredFieldsCheck } from ".";

const { oops, missingReqFields } = responseMessages.errorResponse;

export const handleNewChannel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, [
    "name",
    "server_id",
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
      res.status(201);
      res.json({
        channel,
        message: "New channel created",
      });
    } catch (err) {
      res.status(oops.status);
      res.json({ error: oops.message });
    }
  } else if (missingFields.length > 0) {
    res.status(missingReqFields.status);
    res.json({
      error: missingReqFields.message,
      missingFields,
    });
  } else {
    res.status(oops.status);
    res.json({ error: oops.message });
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
    res.status(oops.status);
    res.json({ error: oops.message });
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
    res.status(oops.status);
    res.json({ error: oops.message });
  }
};
