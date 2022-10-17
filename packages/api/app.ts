import express, { Express, json } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { PORT } from "./config/config";
import routes from "./routes/index";
import { runSocketServer, SocketServer } from "./controllers/socket";

const CORS_ORIGIN = ["http://localhost:3000"];
const app: Express = express(); // sätter upp en express server

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(json());
// app.use(cookieParser());

const server = http.createServer(app); // skapar en http server
export const io = new Server<SocketServer>(server, {
  cors: { origin: ["http://localhost:3000"], credentials: true },
});

io.use(runSocketServer);
app.use("/", routes);

server.listen(PORT, async () => {
  console.log(`Express server running on port: ${PORT}`);
}); // lyssnar på http servern
