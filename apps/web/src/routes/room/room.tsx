import { h } from "preact";
import { Fragment, lazy, Suspense, useEffect } from "preact/compat";
import Chat from "../../components/chat/chat";
import Controls from "../../components/controls/controls";
import { IRoom } from "types/src/Room";
import { joinRoom, leaveRoom, subscribeToJoinRoom } from "../../api/room";
import { IExternalEvent } from "types/src/ExternalEvent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectRoom, setRoom } from "../../store/room/roomSlice";
import Loader from "../../components/loader/loader";
import styles from "./room.styles.css";

const Player = lazy(() => import("../../components/player/player"));

interface IRoomProps {
  roomId: string;
}

function Room({ roomId }: IRoomProps) {
  const room = useAppSelector(selectRoom);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeFromJoinRoom = subscribeToJoinRoom(onJoinRoom);
    joinRoom(roomId);

    return () => {
      unsubscribeFromJoinRoom();
      leaveRoom(roomId);
      dispatch(setRoom(null));
    };
  }, []);

  const onJoinRoom = (extEvt: IExternalEvent<IRoom>) => {
    if (extEvt.payload) {
      dispatch(setRoom(extEvt.payload));
    } else if (extEvt.message) {
      alert(extEvt.message);
    }
  };

  return (
    <section className={styles.room}>
      {room && (
        <Fragment>
          <div className={styles.view}>
            <Suspense fallback={<div>loading.....</div>}>
              <Player selectedSource={room.selectedSource} player={room.player} roomId={roomId} />
            </Suspense>
            <Controls sources={room.sources} selectedSource={room.selectedSource} roomId={roomId} />
          </div>
          <Chat chatHistory={room.chatHistory} />
        </Fragment>
      )}
      {!room && <Loader />}
    </section>
  );
}

export default Room;
