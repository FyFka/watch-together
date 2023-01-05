import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IRoom } from "types/src/Room";
import { getRooms, subscribeToRooms } from "../../api/room";
import Loader from "../loader/loader";
import RoomPreview from "../roomPreview/roomPreview";
import styles from "./lastRooms.styles.css";

function RoomList() {
  const [rooms, setRooms] = useState<IRoom[] | null>(null);

  useEffect(() => {
    const unsubscribeFromRooms = subscribeToRooms(onRooms);
    getRooms();

    return () => {
      unsubscribeFromRooms();
    };
  }, []);

  const onRooms = (extEvt: IExternalEvent<IRoom[]>) => {
    if (extEvt.payload) {
      setRooms(extEvt.payload);
    } else {
      setRooms([]);
      alert(extEvt.message);
    }
  };

  return (
    <section className={styles.lastRooms}>
      <h2 className={styles.title}>Your last rooms</h2>
      {Array.isArray(rooms) && (
        <div className={styles.rooms}>
          {rooms.map((room) => (
            <RoomPreview key={room.id} room={room} />
          ))}
        </div>
      )}
      {!rooms && <Loader />}
    </section>
  );
}

export default RoomList;
