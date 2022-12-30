import { IAccount } from "../../shared/Account";
import { IExternalEvent } from "../../shared/ExternalEvent";

export const toAccountView = (doc: { account: IAccount }): IExternalEvent<IAccount> => {
  return { payload: doc.account };
};
