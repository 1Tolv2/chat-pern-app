import express, {
  Request,
  Response,
  Express,
  json,
  NextFunction,
} from "express";
import cors from "cors";
import { PORT, ALTER_DATABASE } from "./config/config";
import routes from "./routes/index";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app: Express = express();
app.use(cors());
app.use(json());
app.use(cookieParser());

app.use(async (req: Request, res: Response, next: NextFunction) => {
  // const token = req.cookies.access_token;
  // console.log("token", req.cookies);4
console.log("Authorizing")
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

app.use("/", routes);

app.listen(PORT, async () => {
  console.log(`Express server running on port: ${PORT}`);
});
