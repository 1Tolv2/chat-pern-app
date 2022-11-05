import { Request, Response } from "express";
import { createPost, findAllPosts, findPostById } from "../models/Post";
import { requiredFieldsCheck } from ".";

export const handleNewPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(
    { ...req.body, user_id: req.user?.user_id },
    ["channel_id", "text", "user_id"]
  );
  if (missingFields.length === 0) {
    try {
      const post = await createPost({
        text: req.body.text,
        username: req.user?.username,
        user_id: req.user?.user_id,
        channel_id: req.body.channel_id,
      });

      res.status(201);
      res.json({ post, message: "New post created" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500);
        res.json({ error: err.message });
      }
    }
  } else {
    res.status(400);
    res.json({
      error: "Missing required fields",
      missingFields,
    });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await findAllPosts();
    res.json(posts);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500);
      res.json({ error: err.message });
    }
  }
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await findPostById(req.params.id);
    res.json(post);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500);
      res.json({ error: err.message });
    }
  }
};
