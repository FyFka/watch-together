import Avatar from "boring-avatars";
import { h } from "preact";
import { selectAccount } from "../../store/account/accountSlice";
import { useAppSelector } from "../../store/hooks";
import styles from "./miniAccount.styles.css";

function MiniAccount() {
  const account = useAppSelector(selectAccount);

  return (
    <button className={styles.miniProfile} title={account?.username}>
      {account && <Avatar size={40} name={account.username} variant="marble" />}
      {!account && <div className={styles.empty} />}
    </button>
  );
}

export default MiniAccount;
