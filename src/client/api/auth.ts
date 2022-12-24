import { IExtendedError } from "../../backend/handlers/auth";
import { IExtendedAccount } from "../../shared/Account";
import { IResponse } from "../../shared/Response";
import { socket } from "./connection";

export const subscribeToNewAccount = (callback: (res: IResponse<IExtendedAccount>) => void) => {
  socket.on("connect_error", (err: IExtendedError) => {
    if (err.data && err.data.evt === "auth::get:account-new") {
      callback(err.data);
    }
  });
};

export const unsubscribeFromNewAccount = () => {
  socket.off("auth::get:account-new");
};
