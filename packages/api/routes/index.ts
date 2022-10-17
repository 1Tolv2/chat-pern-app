import express, { NextFunction, Request, Response, Router } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import { requireLogin } from '../controllers/auth';
import usersRouter from './users'
import postsRouter from './posts'
import channelsRouter from './channels'
import serversRouter from './servers'


const router: Router = express.Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.cookies.access_token;
    // console.log("token", req.cookies);
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
      const token = authHeader.split(" ")[1]; // splitta så vi får ut tokenen
      try {
        req.user = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
      } catch (error: any) {
        error.message === "invalid token" &&
          res.status(401).json({ error: "Invalid token" });
      }
    }
    next();
  });

router.use("/users", usersRouter)
router.use("/posts", requireLogin, postsRouter)
router.use("/channels", requireLogin, channelsRouter)
router.use("/servers", requireLogin, serversRouter)


export default router 