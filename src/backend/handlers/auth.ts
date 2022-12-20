import jwt from "jsonwebtoken";
import config from "../config";

export const handleInvalidToken = () => {
  const err = new Error("Not authorized") as any;
  const account = {
    username: "Admin",
    avatar: "https://avatars.mds.yandex.net/get-yapic/28053/Lfk78xs0i0vJwyPwdRwjVLD8-1/islands-retina-middle",
  };
  err.data = {
    evt: "auth::get:account-new",
    payload: { token: jwt.sign(account, config.JWT_SECRET, { expiresIn: "72h" }), account },
  };

  return err;
};
