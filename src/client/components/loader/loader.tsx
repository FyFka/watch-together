import { h } from "preact";
import styles from "./loader.styles.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Loader;
