import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import { getAccount, subscribeToAccount, unsubscribeFromAccount } from "../../api/account";
import { IAccount } from "../../types/Account";
import { getFromLocalStorage } from "../../utils/localStorage";
import styles from "./miniAccount.styles.css";

function MiniAccount() {
  const [miniAccount, setMiniAccount] = useState(getFromLocalStorage<IAccount>("cached_account"));

  useEffect(() => {
    subscribeToAccount(handleAccount);
    getAccount();

    return () => {
      unsubscribeFromAccount();
    };
  }, []);

  const handleAccount = (account: IAccount) => {
    console.log(account);
    setMiniAccount(account);
  };

  return (
    <button className={styles.miniProfile} title={miniAccount?.username}>
      {miniAccount && (
        <img className={styles.avatar} src={miniAccount?.avatar} alt={`${miniAccount?.username} avatar`} />
      )}
      {!miniAccount && <div className={styles.emptyAvatar} />}
    </button>
  );
}

export default MiniAccount;
