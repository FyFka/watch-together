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

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

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
  console.log(`Server is running on port: ${config.PORT}`);
});
