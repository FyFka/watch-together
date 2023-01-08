import { Socket } from "socket.io";
import { handleAccount, handleCreateCustomAccount, handleDeleteAccount, handleLogin } from "../handlers/account";
import { handleDisconnect } from "../handlers/room";

const registerAccountEvents = (socket: Socket) => {
  socket.on("account::send:create-custom", async (username: string, password: string) => {
    socket.emit("account::get:create-custom", await handleCreateCustomAccount(username, password));
  });
  socket.on("account::send:account", () => {
    socket.emit("account::get:account", handleAccount(socket));
  });
  socket.on("account::send:delete", async () => {
    socket.emit("account::get:delete", await handleDeleteAccount(socket));
  });
  socket.on("account::send:sign-out", async () => {
    socket.emit("account::get:sign-out", await handleDisconnect(socket));
  });
  socket.on("account::send:login", async (username: string, password: string) => {
    socket.emit("account::get:login", await handleLogin(username, password));
  });
};

export default registerAccountEvents;
