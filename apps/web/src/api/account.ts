import { IAccount } from "types/src/Account";
import { IExternalEvent } from "types/src/ExternalEvent";
import { socket } from "./connection";

export const getAccount = () => {
  socket.emit("account::send:account");
};

export const subscribeToAccount = (callback: (extEvt: IExternalEvent<IAccount>) => void) => {
  socket.on("account::get:account", callback);

  return () => {
    socket.off("account::get:account", callback);
  };
};
