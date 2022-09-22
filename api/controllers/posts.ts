import { Request, Response } from 'express' 
import { findAll, createPost, findById } from '../models/Post'


export const getAllPosts = async (req: Request, res: Response) => {
    const users = await findAll()
    res.json({users})
}

export const getPostById = async (req: Request, res: Response) => {
    const user = await findById(parseInt(req.params.id))
    console.log(user)
    res.json({user})
}

export const handleNewPost = async (req: Request, res: Response) => {
    const id: number = req.body.id
    const body: string = req.body.body

    const newPost = await createPost(id, body)
    console.log(newPost)
    newPost ? res.status(201).json({message: `New posst published`}) : res.status(400).json({message: `Could not create user`})
}