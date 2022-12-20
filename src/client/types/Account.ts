export interface IExtendedAccount extends IToken {
  account: IAccount;
}

export interface IAccount {
  avatar: string;
  username: string;
}

export interface IToken {
  token: string;
}
