import { IAccount } from "../../shared/Account";
import { IResponse } from "../../shared/Response";
import { socket } from "./connection";

export const getAccount = () => {
  socket.emit("account::send:account");
};

export const subscribeToAccount = (callback: (res: IResponse<IAccount>) => void) => {
  socket.on("account::get:account", callback);
};

export const unsubscribeFromAccount = () => {
  socket.off("account::get:account");
};
