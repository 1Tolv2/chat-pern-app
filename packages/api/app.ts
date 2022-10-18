import express, { Express, json } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import routes from "./routes/index";
import { runSocketServer, SocketServer } from "./controllers/socket";
import { CORS_ORIGINS } from "./config/config";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express(); // sätter upp en express server
app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(json());
// app.use(cookieParser());

const server = http.createServer(app); // skapar en http server
const io = new Server<SocketServer>(server, {
  cors: { origin: CORS_ORIGINS, credentials: true },
});

io.use(runSocketServer);
app.use("/", routes);

export { app, server, io };
