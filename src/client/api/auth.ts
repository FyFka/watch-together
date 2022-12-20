import { IExtendedAccount } from "../types/Account";
import { IResponse } from "../types/Response";
import { socket } from "./connection";

export const subscribeToNewAccount = (callback: (res: IResponse<IExtendedAccount>) => void) => {
  socket.on("connect_error", (err: any) => {
    if (err.data.evt === "auth::get:account-new") {
      callback(err.data);
    }
  });
};

export const unsubscribeFromNewAccount = () => {
  socket.off("auth::get:account-new");
};
