import { IExtendedAccount } from "types/src/Account";
import { IExtendedError } from "types/src/ExtendedError";
import { IExternalEvent } from "types/src/ExternalEvent";
import { socket } from "./connection";

export const subscribeToNewAccount = (callback: (extEvt: IExternalEvent<IExtendedAccount>) => void) => {
  socket.on("connect_error", (err: IExtendedError) => {
    if (err.data && err.data.evt === "auth::get:account-new") {
      callback(err.data);
    }
  });

  return () => {
    socket.off("connect_error", callback);
  };
};