import express from "express";
import http from "http";
import { Server } from "socket.io";
import compression from "compression";
import config from "./config";
import path from "path";
import { handleCreateRoom } from "./handlers/room";
import { authMiddleware } from "./middlewares/auth";
import { handleAccount } from "./handlers/account";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.disable("x-powered-by");
app.use(compression());

app.use(
  express.static(path.join(__dirname, "..", "client"), {
    maxAge: "7d",
    index: false,
    setHeaders: (res, _) => {
      if (res.req.path === "/sw.js") {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      }
    },
  })
);

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

io.use(authMiddleware);
io.on("connection", (socket) => {
  socket.on("room::send:create", async () => {
    socket.emit("room::get:create", await handleCreateRoom());
  });
  socket.on("account::send:account", () => {
    socket.emit("account::get:account", handleAccount(socket));
  });
});

server.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}`);
});
