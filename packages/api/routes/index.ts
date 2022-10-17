import express, { NextFunction, Request, Response, Router } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleToken, requireLogin } from '../controllers/auth';
import usersRouter from './users'
import postsRouter from './posts'
import channelsRouter from './channels'
import serversRouter from './servers'


const router: Router = express.Router()

router.use(handleToken); // sets req.user if token is valid
router.use("/users", usersRouter)
router.use("/posts", requireLogin, postsRouter)
router.use("/channels", requireLogin, channelsRouter)
router.use("/servers", requireLogin, serversRouter)


export default router 