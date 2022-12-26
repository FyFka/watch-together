import { h } from "preact";
import { useState } from "preact/compat";
import { IAccount } from "../../../../shared/Account";
import styles from "./menu.module.css";

interface IMenuProps {
  account: IAccount;
}

function Menu({ account }: IMenuProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.profile}>
        <p className={styles.signedAs}>You are signed in as</p>
        <p className={styles.username}>{account.username}</p>
        <p className={styles.password}>
          Password:
          <span onClick={handleReveal} className={`${styles.passwordInner} ${revealed ? "" : styles.hidden}`}>
            {account.password}
          </span>
        </p>
      </div>
      <ul className={styles.actions}>
        <li>
          <button className={styles.action}>Create an account</button>
        </li>
        <li>
          <button className={styles.action}>Login</button>
        </li>
        <li>
          <button className={styles.action}>Delete account</button>
        </li>
      </ul>
      <button className={styles.signOut}>Sign out</button>
    </div>
  );
}

export default Menu;
