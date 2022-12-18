import { h } from "preact";
import { route } from "preact-router";
import { useState } from "preact/compat";
import Button from "../button/button";
import styles from "./createRoom.styles.css";

export default function CreateRoom() {
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    setLoading(true);
    const room = (await new Promise((res) => {
      setTimeout(() => {
        res({ payload: { id: "123" }, message: "Room created" });
      }, 1000);
    })) as { payload: { id: string }; message: string };
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
