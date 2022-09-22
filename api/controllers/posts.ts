import { Request, Response } from 'express' 
import { findAll, createPost, findById } from '../models/Post'


export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await findAll()
    res.json({posts})
}

export const getPostById = async (req: Request, res: Response) => {
    const post = await findById(parseInt(req.params.id))
    console.log(post)
    res.json({post})
}

export const handleNewPost = async (req: Request, res: Response) => {
    const userId: number = req.body.userId
    const body: string = req.body.body
    const newPost = await createPost(userId, body)
    console.log(newPost)
    newPost ? res.status(201).json({message: `New post published`}) : res.status(400).json({message: `Could not create user`})
}