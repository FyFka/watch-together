import { IAccount } from "types/src/Account";
import { IExtendedError } from "types/src/ExtendedError";
import { IExternalEvent } from "types/src/ExternalEvent";
import { socket } from "./connection";

export const subscribeToCreatedAccount = (callback: (extEvt: IExternalEvent<string>) => void) => {
  const onConnectError = (err: IExtendedError) => {
    if (err.data && err.data.evt === "auth::get:create-account") {
      callback(err.data);
    }
  };

  socket.on("connect_error", onConnectError);

  return () => {
    socket.off("connect_error", onConnectError);
  };
};

export const getAccount = () => {
  socket.emit("account::send:account");
};

export const subscribeToAccount = (callback: (extEvt: IExternalEvent<IAccount>) => void) => {
  socket.on("account::get:account", callback);

  return () => {
    socket.off("account::get:account", callback);
  };
};

export const deleteAccount = () => {
  socket.emit("account::send:delete");
};

export const signOut = () => {
  socket.emit("account::send:sign-out");
};

export const login = (username: string, password: string) => {
  socket.emit("account::send:login", username, password);
};

export const subscribeToLogin = (callback: (extEvt: IExternalEvent<string>) => void) => {
  socket.on("account::get:login", callback);

  return () => {
    socket.off("account::get:login", callback);
  };
};

export const createCustomAccount = (username: string, password: string) => {
  socket.emit("account::send:create-custom", username, password);
};

export const subscribeToCreatedCustomAccount = (callback: (extEvt: IExternalEvent<string>) => void) => {
  socket.on("account::get:create-custom", callback);

  return () => {
    socket.off("account::get:create-custom", callback);
  };
};
