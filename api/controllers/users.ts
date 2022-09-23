import { Request, Response } from 'express' 
import { findAll, createUser, findUserWithPosts } from '../models/User'


export const getAllUsers = async (req: Request, res: Response) => {
    const users = await findAll()
    res.json({users})
}

export const getUserById = async (req: Request, res: Response) => {
    const user = await findUserWithPosts(parseInt(req.params.id))
    console.log(user)
    res.json({user})
}

export const handleNewUser = async (req: Request, res: Response) => {
    const name: string = req.body.name
    const nickname: string = req.body.nickname
    const newUser = await createUser(name, nickname)
    console.log(newUser)
    newUser ? res.status(201).json({message: `User ${name} created`}) : res.status(400).json({message: `Could not create user`})
}