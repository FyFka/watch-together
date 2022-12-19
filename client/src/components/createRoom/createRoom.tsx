import { h } from "preact";
import { route } from "preact-router";
import { useState } from "preact/compat";
import { createRoom } from "../../api/room";
import Button from "../button/button";
import styles from "./createRoom.styles.css";

function CreateRoom() {
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    setLoading(true);
    const room = await createRoom();
    setLoading(false);
    if (room.payload) {
      route(`/room/${room.payload.id}`);
    } else {
      alert(room.message);
    }
  };

  return (
    <Button onClick={handleCreateRoom} className={styles.createRoom}>
      {loading ? "Creating room..." : "Create room"}
    </Button>
  );
}

export default CreateRoom;
