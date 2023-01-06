import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IRoom } from "types/src/Room";
import { getLastRooms, subscribeToLastRooms } from "../../api/room";
import Loader from "../loader/loader";
import RoomPreview from "../roomPreview/roomPreview";
import styles from "./lastRooms.styles.css";

function LastRooms() {
  const [lastRooms, setLastRooms] = useState<IRoom[] | null>(null);

  useEffect(() => {
    const unsubscribeFromLastRooms = subscribeToLastRooms(onLastRooms);
    getLastRooms();

    return () => {
      unsubscribeFromLastRooms();
    };
  }, []);

  const onLastRooms = (extEvt: IExternalEvent<IRoom[]>) => {
    if (extEvt.payload) {
      setLastRooms(extEvt.payload);
    } else {
      setLastRooms([]);
      alert(extEvt.message);
    }
  };

  return (
    <section className={styles.lastRooms}>
      <h2 className={styles.title}>Your last rooms</h2>
      {Array.isArray(lastRooms) && (
        <div className={styles.rooms}>
          {lastRooms.map((room) => (
            <RoomPreview key={room.id} room={room} />
          ))}
        </div>
      )}
      {!lastRooms && <Loader />}
    </section>
  );
}

export default LastRooms;
