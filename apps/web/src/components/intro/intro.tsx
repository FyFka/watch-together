import { h } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/compat";
import { createRoom, subscribeToCreatedRoom } from "../../api/room";
import { IExternalEvent } from "types/src/ExternalEvent";
import Button from "../button/button";
import styles from "./intro.styles.css";

function Intro() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribeFromCreatedRoom = subscribeToCreatedRoom(onCreateRoom);

    return () => {
      unsubscribeFromCreatedRoom();
    };
  }, []);

  const onCreateRoom = (extEvt: IExternalEvent<{ id: string }>) => {
    setLoading(false);
    if (extEvt.payload) {
      route(`/room/${extEvt.payload.id}`);
    } else {
      alert(extEvt.message);
    }
  };

  const handleCreateRoom = () => {
    setLoading(true);
    createRoom();
  };

  return (
    <section className={styles.intro}>
      <h1 className={styles.title}>Watch together Movies, YouTube, TV shows and more.</h1>
      <p className={styles.subtitle}>Watch anywhere / anytime.</p>
      <Button onClick={handleCreateRoom} className={styles.createRoom}>
        {loading ? "Creating room..." : "CREATE ROOM"}
      </Button>
      <div className={styles.concord}>
        <div className={styles.concordImg} />
        <div className={styles.concordGradient} />
      </div>
    </section>
  );
}

export default Intro;
