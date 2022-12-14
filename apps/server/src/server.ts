/* eslint-disable no-console */
import express from "express";
import http from "http";
import { Server } from "socket.io";
import compression from "compression";
import config from "./config";
import { authMiddleware } from "./middlewares/auth";
import anyRouteHandler from "./routes/[index]";
import registerRoomEvents from "./events/room";
import registerAccountEvents from "./events/account";
import staticFiles from "./static";
import registerVideoEvents from "./events/video";
import initDatabase from "./database";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
initDatabase();

app.disable("x-powered-by");
app.use(compression());
app.use(staticFiles());
app.use(anyRouteHandler);

io.use(authMiddleware);
io.on("connection", (socket) => {
  registerRoomEvents(socket);
  registerAccountEvents(socket);
  registerVideoEvents(io, socket);
});

server.listen(config.PORT, () => {
  console.log(`[STATE]: Server is running on port ${config.PORT}`);
});
