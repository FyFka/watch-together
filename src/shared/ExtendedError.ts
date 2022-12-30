import { IExtendedAccount } from "./Account";

export interface IExtendedError extends Error {
  data?: {
    evt: string;
    payload: IExtendedAccount;
  };
}
