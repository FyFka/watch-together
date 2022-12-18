import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import styles from "./footer.styles.css";
import { subscribeToConnection, unsubscribeFromConnection } from "../../api/connection";

function Footer() {
  const [connectionId, setConnectionId] = useState<string>("");

  useEffect(() => {
    subscribeToConnection(handleConnectionChange);

    return () => {
      unsubscribeFromConnection();
    };
  }, []);

  const handleConnectionChange = (newConnectionId: string) => {
    setConnectionId(newConnectionId);
  };

  return (
    <footer className={styles.connectionId}>
      {connectionId ? `#${connectionId}` : "connection is not established"}
    </footer>
  );
}

export default Footer;
