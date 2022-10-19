import express, { Express, json } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import routes from "./routes/index";
import { runSocketServer, SocketServer } from "./controllers/socket";
import { CORS_ORIGINS, PORT, POSTGRES_URL } from "./config/config";
import dotenv from "dotenv";
import { setUpDatabase } from "./models";
dotenv.config();

const app: Express = express(); // sätter upp en express server
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(json());
// app.use(cookieParser());

const server = http.createServer(app); // skapar en http server
const io = new Server<SocketServer>(server, {
  cors: { origin: CORS_ORIGINS, credentials: true },
});

io.use(runSocketServer);
app.use("/", routes);

server.listen(PORT, async () => {
  await setUpDatabase(POSTGRES_URL);
  console.log(`Express server running on port: ${PORT}`);
});

export { server, app, io };
