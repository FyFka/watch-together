import Avatar from "boring-avatars";
import { h } from "preact";
import { useState } from "preact/compat";
import { selectAccount } from "../../store/account/accountSlice";
import { useAppSelector } from "../../store/hooks";
import Menu from "./menu/menu";
import styles from "./miniAccount.styles.css";

function MiniAccount() {
  const account = useAppSelector(selectAccount);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  const isExpanded = account && expanded;
  return (
    <div className={styles.miniProfile} onFocus={handleExpand} onBlur={handleClose}>
      <button className={styles.miniProfileAction} title={account?.username}>
        {account && <Avatar size={44} name={account.username} variant="marble" />}
        {!account && <div className={styles.default} />}
      </button>
      {isExpanded && <Menu account={account} />}
    </div>
  );
}

export default MiniAccount;
