import { h } from "preact";
import { Link } from "preact-router/match";
import MiniAccount from "../miniAccount/miniAccount";
import styles from "./header.styles.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.container} href="/">
        <div className={styles.logo} />
        <h1 className={styles.appName}>Watch together</h1>
      </Link>
      <MiniAccount />
    </header>
  );
}

export default Header;
