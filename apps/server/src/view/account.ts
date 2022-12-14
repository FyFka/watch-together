import { IAccount } from "types/src/Account";
import { IExternalEvent } from "types/src/ExternalEvent";

export const toAccountView = (doc: { account: IAccount }): IExternalEvent<IAccount> => {
  return { payload: doc.account };
};

export const toTokenView = (token: string): IExternalEvent<string> => {
  return { payload: token };
};
