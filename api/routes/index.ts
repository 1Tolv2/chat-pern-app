import express, { Router } from 'express';
import usersRouter from './users'
import postsRouter from './posts'
import channelsRouter from './channels'
import serversRouter from './servers'

const router: Router = express.Router()

router.use("/users", usersRouter)
router.use("/posts", postsRouter)
router.use("/channels", channelsRouter)
router.use("/servers", serversRouter)


export default router 