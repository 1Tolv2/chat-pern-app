import { Request, Response } from "express";
import { createPost } from "../models/Post";

export const handleNewPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { channelId, text } = req.body;
  const post = await createPost({
    user_id: parseInt(req.user?.userId),
    channel_id: parseInt(channelId),
    text,
  });

  res.json(post);
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ posts: [{ message: "All posts" }] });
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ post: [{ message: "Post with user and channel" }] });
}; // get /:id with posts

export const editPost = async (req: Request, res: Response): Promise<void> => {
  res.json({ post: { message: "Post updated" } });
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ message: "Post deleted" });
};
