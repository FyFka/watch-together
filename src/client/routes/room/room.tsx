import { Fragment, h } from "preact";
import { useEffect } from "preact/compat";
import Chat from "../../components/chat/chat";
import Controls from "../../components/controls/controls";
import { IRoom } from "../../../shared/Room";
import { joinRoom, leaveRoom, subscribeToJoinRoom } from "../../api/room";
import { IResponse } from "../../../shared/Response";
import Player from "../../components/player/player";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectRoom, setRoom } from "../../store/room/roomSlice";
import styles from "./room.styles.css";
import "video.js/dist/video-js.css";
import Loader from "../../components/loader/loader";

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
      dispatch(setRoom(null));
      leaveRoom(roomId);
    };
  }, []);

  const onJoinRoom = (res: IResponse<IRoom>) => {
    if (res.payload) {
      dispatch(setRoom(res.payload));
    } else if (res.message) {
      alert(res.message);
    }
  };

  return (
    <section className={styles.room}>
      {room && (
        <Fragment>
          <div className={styles.view}>
            <Player src={room.selected} roomId={roomId} />
            <Controls playlist={room.playlist} selected={room.selected} roomId={roomId} />
          </div>
          <Chat chatHistory={room.chatHistory} />
        </Fragment>
      )}
      {!room && <Loader />}
    </section>
  );
}

export default Room;
