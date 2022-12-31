import { h } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/compat";
import { createRoom, subscribeToCreatedRoom } from "../../api/room";
import { IExternalEvent } from "types/src/ExternalEvent";
import Button from "../button/button";
import styles from "./createRoom.styles.css";

function CreateRoom() {
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
    <Button onClick={handleCreateRoom} className={styles.createRoom}>
      {loading ? "Creating room..." : "Create room"}
    </Button>
  );
}

export default CreateRoom;
