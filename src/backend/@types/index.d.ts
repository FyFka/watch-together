import { IAccount } from "../../shared/Account";

declare module "socket.io" {
  interface Socket {
    account: IAccount;
  }
}
