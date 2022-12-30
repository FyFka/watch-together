import { IAccount } from "../../shared/Account";
import { IExternalEvent } from "../../shared/ExternalEvent";
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
