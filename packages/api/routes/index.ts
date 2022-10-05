import express, { Router } from 'express';
import usersRouter from './users'
import postsRouter from './posts'
import channelsRouter from './channels'
import serversRouter from './servers'
import { requireLogin } from '../controllers/auth';

const router: Router = express.Router()

router.use("/users", usersRouter)
router.use("/posts", requireLogin, postsRouter)
router.use("/channels", requireLogin, channelsRouter)
router.use("/servers", requireLogin, serversRouter)


export default router 