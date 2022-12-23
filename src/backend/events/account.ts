import { Socket } from "socket.io";
import { handleAccount } from "../handlers/account";

const registerAccountEvents = (socket: Socket) => {
  socket.on("account::send:account", () => {
    socket.emit("account::get:account", handleAccount(socket));
  });
};

export default registerAccountEvents;
