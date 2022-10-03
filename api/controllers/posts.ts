import { Request, Response } from "express";

export const handleNewPost = async (req: Request, res: Response) => {
  const {channelId, body} = req.body; 
  console.log(req.user);
  console.log(channelId, body);
  
  res.json({ post: { message: "New post created" } });
};

export const getAllPosts = async (req: Request, res: Response) => {
  res.json({ posts: [{ message: "All posts" }] });
};

export const getPostById = async (req: Request, res: Response) => {
  res.json({ post: [{ message: "Post with user and channel" }] });
}; // get /:id with posts

export const editPost = async (req: Request, res: Response) => {
  res.json({ post: { message: "Post updated" } });
};

export const deletePost = async (req: Request, res: Response) => {
  res.json({ message: "Post deleted" });
};
