import { IAccount } from "../types/Account";
import { socket } from "./connection";

export const getAccount = () => {
  socket.emit("account::send:account-full");
};

export const subscribeToAccount = (callback: (account: IAccount) => void) => {
  socket.on("account::get:account-full", callback);
};

export const unsubscribeFromAccount = () => {
  socket.off("account::get:account-full");
};
