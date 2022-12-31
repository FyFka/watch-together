import { Socket } from "socket.io";
import { IAccount } from "types/src/Account";
import { IExternalEvent } from "types/src/externalEvent";
import { toAccountView } from "../view/account";

export const handleAccount = (socket: Socket): IExternalEvent<IAccount> => {
  return toAccountView(socket);
};
