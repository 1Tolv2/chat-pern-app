import { Request, Response } from 'express' 
import { findAll, createPost, findById, findPostsByChannelId } from '../models/Post'


export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await findAll()
    res.json({posts})
}

export const getAllPostsByChannelId = async (req: Request, res: Response) => {
    const id = req.params.id
    console.log(req.params.id)
    const posts = await findPostsByChannelId(id)
    res.json({posts})
}

export const getPostById = async (req: Request, res: Response) => {
    const post = await findById(req.params.id)
    console.log(post)
    res.json({post})
}

export const handleNewPost = async (req: Request, res: Response) => {
    console.log("HERE",req.body)
    const userId: string = req.body.userId
    const channelId: string = req.body.channelId
    const body: string = req.body.body
    const newPost = await createPost(userId, channelId, body)
    console.log(newPost)
    newPost ? res.status(201).json({message: `New post published`}) : res.status(400).json({message: `Could not create user`})
}