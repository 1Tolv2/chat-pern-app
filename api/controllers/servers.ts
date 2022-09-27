import { Request, Response } from "express";

export const handleNewServer = async (req: Request, res: Response) => {
    res.json({ Server: { message: "New server created" } });
  };

  export const getAllServers = async (req: Request, res: Response) => {
    res.json({ Servers: [{ message: "All servers" }] });
  }; 
  export const getServerById = async (req: Request, res: Response) => {
    res.json({ Server: [{ message: "Server with channels and users" }] });
  }; // get /:id with Servers
  
  export const editServer = async (req: Request, res: Response) => {
    res.json({ Server: { message: "Server updated" } });
  }; 
  
  export const deleteServer = async (req: Request, res: Response) => {
    res.json({ message: "Server deleted" });
  }; 