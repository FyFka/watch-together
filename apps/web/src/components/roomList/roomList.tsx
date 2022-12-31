import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IRoom } from "types/src/Room";
import { getRooms, subscribeToRooms } from "../../api/room";
import Loader from "../loader/loader";
import styles from "./roomList.styles.css";

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
      alert(extEvt.message);
      setRooms([]);
    }
  };

  return (
    <div className={styles.roomList}>
      {Array.isArray(rooms) && (
        <Fragment>
          <h1 className={styles.title}>Your rooms</h1>
          <ul className={styles.rooms}>
            {rooms.map((room) => (
              <li key={room}>{room.id}</li>
            ))}
          </ul>
        </Fragment>
      )}
      {!rooms && <Loader />}
    </div>
  );
}

export default RoomList;
