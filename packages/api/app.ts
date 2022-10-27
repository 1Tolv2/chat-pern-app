import express, { Express, json } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import routes from "./routes/index";
import { runSocketServer, SocketServer } from "./controllers/socket";
import { CORS_ORIGINS } from "./config/config";
import dotenv from "dotenv";
import { createPool } from "slonik";
dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server<SocketServer>(server, {
  cors: { origin: CORS_ORIGINS, credentials: true },
});

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(json());

io.use(runSocketServer);
app.use("/", routes);

export { server, app, io };
