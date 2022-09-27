import { Request, Response } from "express";
export const handleNewChannel = async (req: Request, res: Response) => {
  res.json({ channel: { message: "New channel created" } });
}; 

export const getAllChannels = async (req: Request, res: Response) => {
  res.json({ channels: [{ message: "All channels" }] });
}; 

export const getChannelById = async (req: Request, res: Response) => {
  res.json({ channel: [{ message: "Channel with posts, with users" }] });
}; // get /:id with posts

export const editChannel = async (req: Request, res: Response) => {
  res.json({ channel: { message: "Channel updated" } });
}; 

export const deleteChannel = async (req: Request, res: Response) => {
  res.json({ message: "Channel deleted" });
};