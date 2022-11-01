import express, { Express, json } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import routes from "./routes/index";
import { runSocketServer, SocketServer } from "./controllers/socket";
import { CORS_ORIGINS } from "./config/config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server<SocketServer>(server, {
  cors: { origin: CORS_ORIGINS, credentials: true },
  cookie: true,
});

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(json());
app.use(cookieParser());

io.use(runSocketServer);
app.use("/", routes);

export { server, app, io };
