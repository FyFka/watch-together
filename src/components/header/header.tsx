import { h } from "preact";
import { Link } from "preact-router/match";
import styles from "./header.styles.css";

const Header = () => (
  <header className={styles.header}>
    <Link className={styles.container} href="/">
      <div className={styles.logo} />
      <h1 className={styles.appName}>Watch together</h1>
    </Link>
  </header>
);

export default Header;
