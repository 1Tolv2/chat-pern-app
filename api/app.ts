import express, { Request, Response, Express, json, NextFunction } from "express";
import cors from "cors";
import { PORT, ALTER_DATABASE } from "./config/config";
import routes from "./routes/index";
import jwt, {JwtPayload} from "jsonwebtoken";


const app: Express = express();
app.use(cors());
app.use(json());


app.use( async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  // kolla att authHeader är Bearer
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    const token = authHeader.split(" ")[1]; // splitta så vi får ut tokenen
    // const tokenLoggedOut = await ExpToken.findOne({ token });
    // if (tokenLoggedOut) {
    //   res.status(401).json({ error: "Invalid token" });
    // } else {

      try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      } catch (error: any) {
        error.message === "jwt expired"
          ? res.status(401).json({ error: "Token expired" })
          : error.message === "invalid token"
          ? res.status(401).json({ error: "Invalid token" })
          : res.status(400).json({ error: "Token error" });
      }
    // }
  }

  next();
})

app.use("/", routes);

app.listen(PORT, async () => {
  console.log(`Express server running on port: ${PORT}`);
});
