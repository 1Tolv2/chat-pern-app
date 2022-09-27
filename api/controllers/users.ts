import { Request, Response } from 'express'
import { createUser, UserAttributes, findAllUsers } from '../models/User';

export const handleNewUser = async (req: Request<UserAttributes>, res: Response<UserAttributes>): Promise<void> => {
  const user: UserAttributes= await createUser(req.body)
    res.json( user );
  };
  export const getAllUsers = async (req: Request, res: Response) => {
    const users = await findAllUsers();
    res.json(users);
  };
  
  export const getUserById = async (req: Request, res: Response) => {
    res.json({ user: [{ message: "User with posts and servers" }] });
  }; // get /:id with posts
  
  export const editUser = async (req: Request, res: Response) => {
    res.json({ user: { message: "User updated" } });
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    res.json({ message: "User deleted" });
  };