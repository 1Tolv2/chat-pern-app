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
    const username: string = req.body.username
    const email: string = req.body.email
    const password: string = ""
    const newUser = await createUser(username, email, password)
    console.log(newUser)
    newUser ? res.status(201).json({message: `User ${username} created`}) : res.status(400).json({message: `Could not create user`})
}