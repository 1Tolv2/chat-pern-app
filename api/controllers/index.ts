import { Request, Response } from 'express' 
import { getAll, createUser } from '../models/user'


export const getAllUsers = async (req: Request, res: Response) => {
    await getAll()
    res.json({users: []})
}

export const handleNewUser = async (req: Request, res: Response) => {
    console.log("REQUEST", req.body)
    const name: string = "Sofia"
    const nickname: string = "Tolv"
    // await createUser(name, nickname)
    res.json({message: `${nickname} created`})
}