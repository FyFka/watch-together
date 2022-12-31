import { IAccount } from "types/src/Account";

declare module "socket.io" {
  interface Socket {
    account: IAccount;
  }
}
