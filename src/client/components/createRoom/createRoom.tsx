import { h } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/compat";
import { createRoom, subscribeToCreatedRoom } from "../../api/room";
import { IResponse } from "../../types/Response";
import Button from "../button/button";
import styles from "./createRoom.styles.css";

function CreateRoom() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    subscribeToCreatedRoom(handleCreatedRoom);
  }, []);

  const handleCreatedRoom = (res: IResponse<{ id: string }>) => {
    setLoading(false);
    if (res.payload) {
      route(`/room/${res.payload.id}`);
    } else {
      alert(res.message);
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
