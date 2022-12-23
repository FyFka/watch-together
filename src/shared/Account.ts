export interface IExtendedAccount extends IToken {
  account: IAccount;
}

export interface IAccount {
  id: string;
  username: string;
  password: string;
}

export interface IToken {
  token: string;
}
