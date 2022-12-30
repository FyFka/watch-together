import { Socket } from "socket.io";
import { IAccount } from "../../shared/Account";
import { IExternalEvent } from "../../shared/ExternalEvent";
import { toAccountView } from "../view/account";

export const handleAccount = (socket: Socket): IExternalEvent<IAccount> => {
  return toAccountView(socket);
};
