import { sign } from "jsonwebtoken";
import { Socket } from "socket.io";
import { IAccount } from "types/src/Account";
import { IExtendedError } from "types/src/ExtendedError";
import { IExternalEvent } from "types/src/externalEvent";
import config from "../config";
import Account from "../models/account";
import Room from "../models/room";
import { generateAccount } from "../utils/generate";
import { toAccountView, toTokenView } from "../view/account";
import { toErrorView, toSuccessView } from "../view/common";

export const handleCreateAccount = async () => {
  try {
    const { _id } = await Account.create(generateAccount());
    const err = new Error("Not authorized") as IExtendedError;
    err.data = {
      evt: "auth::get:create-account",
      payload: sign({ id: _id.toHexString() }, config.JWT_SECRET, { expiresIn: "168h" }),
    };

    return err;
  } catch (_) {
    return new Error("Failed to create account");
  }
};

export const handleCreateCustomAccount = async (username: string, password: string) => {
  try {
    const { _id } = await Account.create({ username, createdAt: Date.now(), password });
    const token = sign({ id: _id.toHexString() }, config.JWT_SECRET, { expiresIn: "168h" });
    return toTokenView(token);
  } catch (_) {
    return toErrorView("Failed to create account");
  }
};

export const handleAccount = (socket: Socket): IExternalEvent<IAccount> => {
  return toAccountView(socket);
};

export const handleDeleteAccount = async (socket: Socket) => {
  try {
    await Account.findByIdAndDelete(socket.account.id);
    await Room.deleteMany({ owner: socket.account.id });
    await Room.updateMany({ "users.members": socket.account.id }, { $pull: { "users.members": socket.account.id } });
    await Room.updateMany({ "users.online": socket.account.id }, { $pull: { "users.online": socket.account.id } });
    return toSuccessView();
  } catch (_) {
    return toErrorView("Something went wrong");
  }
};

export const handleLogin = async (username: string, password: string) => {
  try {
    const account = await Account.findOne({ username, password });
    if (!account) {
      return toErrorView("Invalid credentials");
    }
    const token = sign({ id: account._id.toHexString() }, config.JWT_SECRET);
    return toTokenView(token);
  } catch (_) {
    return toErrorView("Something went wrong");
  }
};
