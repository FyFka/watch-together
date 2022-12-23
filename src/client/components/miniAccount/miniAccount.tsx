import Avatar from "boring-avatars";
import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import { getAccount, subscribeToAccount, unsubscribeFromAccount } from "../../api/account";
import { IAccount } from "../../../shared/Account";
import { getFromLocalStorage } from "../../utils/localStorage";
import styles from "./miniAccount.styles.css";
import { IResponse } from "../../../shared/Response";

function MiniAccount() {
  const [miniAccount, setMiniAccount] = useState(getFromLocalStorage<IAccount>("cached_account"));

  useEffect(() => {
    subscribeToAccount(handleAccount);
    getAccount();

    return () => {
      unsubscribeFromAccount();
    };
  }, []);

  const handleAccount = (res: IResponse<IAccount>) => {
    if (res.payload) {
      setMiniAccount(res.payload);
    }
  };

  return (
    <button onClick={() => console.log(miniAccount)} className={styles.miniProfile} title={miniAccount?.username}>
      <Avatar size={40} name={miniAccount?.username} variant="marble" />
    </button>
  );
}

export default MiniAccount;
