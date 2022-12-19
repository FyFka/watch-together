import express from "express";
import http from "http";
import { Server } from "socket.io";
import config from "./config";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "..", "client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("room::send:create", () => {
    socket.emit("room::get::create", { payload: { id: "123" } });
  });
});

server.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}`);
});
