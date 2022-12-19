import express from "express";
import http from "http";
import { Server } from "socket.io";
import config from "./config";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}`);
});
