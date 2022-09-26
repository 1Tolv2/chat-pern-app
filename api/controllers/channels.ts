import { Request, Response } from "express";
import { createChannel,findAllChannels } from "../models/Channel";


export const handleNewChannel = async (req: Request, res: Response ) => {
    const name: string = req.body.name
    const description: string = typeof req.body.description !== "undefined" ? req.body.description : ""
    const newChannel = await createChannel(name, description)
    newChannel ? res.status(201).json({message: `New channel setup`}) : res.status(400).json({message: `Could not create channel`})
}

export const getAllChannels = async (req: Request, res: Response) => {
    const channels = await findAllChannels()
    res.json({channels})
}