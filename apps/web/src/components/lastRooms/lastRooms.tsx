import isArray from "lodash/isArray";
import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IRoom } from "types/src/Room";
import { getLastRooms, subscribeToLastRooms } from "../../api/room";
import { selectAccount } from "../../store/account/accountSlice";
import { useAppSelector } from "../../store/hooks";
import Loader from "../loader/loader";
import RoomPreview from "../roomPreview/roomPreview";
import styles from "./lastRooms.styles.css";

function LastRooms() {
  const [lastRooms, setLastRooms] = useState<IRoom[] | null>(null);
  const account = useAppSelector(selectAccount);

  useEffect(() => {
    const unsubscribeFromLastRooms = subscribeToLastRooms(onLastRooms);

    return () => {
      unsubscribeFromLastRooms();
    };
  }, []);

  useEffect(() => {
    if (account) {
      getLastRooms();
    }
  }, [account]);

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
      {isArray(lastRooms) && (
        <div className={styles.rooms}>
          {lastRooms.map((room) => (
            <RoomPreview key={room.id} room={room} />
          ))}
        </div>
      )}
      {!isArray(lastRooms) && <Loader />}
    </section>
  );
}

export default LastRooms;
