import { Request, Response } from "express";
import { findAllChannels, findChannelById } from "../models/Channel";
import { findAllPostsByChannel } from "../models/Post";

export const handleNewChannel = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ channel: { message: "New channel created" } });
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
