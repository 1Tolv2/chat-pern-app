import express, { Express, json } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import routes from "./routes/index";
import { runSocketServer, SocketServer } from "./controllers/socket";
import { PORT } from "./config/config";

const CORS_ORIGIN = ["http://localhost:3000"];
const app: Express = express(); // sätter upp en express server

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(json());
// app.use(cookieParser());

const server = http.createServer(app); // skapar en http server
const io = new Server<SocketServer>(server, {
  cors: { origin: ["http://localhost:3000"], credentials: true },
});

io.use(runSocketServer);
app.use("/", routes);

export { app, server, io };
