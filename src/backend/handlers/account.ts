import { Socket } from "socket.io";
import { IAccount } from "../../shared/Account";
import { IResponse } from "../../shared/Response";

export const handleAccount = (socket: Socket): IResponse<IAccount> => {
  return { payload: socket.account };
};
