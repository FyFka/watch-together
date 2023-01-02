import { h } from "preact";
import { useEffect } from "preact/compat";
import Chat from "../../components/chat/chat";
import Controls from "../../components/controls/controls";
import { IRoom } from "types/src/Room";
import { joinRoom, leaveRoom, subscribeToJoinRoom } from "../../api/room";
import { IExternalEvent } from "types/src/ExternalEvent";
import Player from "../../components/player/player";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectRoom, setRoom } from "../../store/room/roomSlice";
import Loader from "../../components/loader/loader";
import styles from "./room.styles.css";

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

  const onJoinRoom = (extEvt: IExternalEvent<IRoom>) => {
    if (extEvt.payload) {
      dispatch(setRoom(extEvt.payload));
    } else if (extEvt.message) {
      alert(extEvt.message);
    }
  };

  const { selected, player, playlist, chatHistory } = room || {
    selected: "",
    player: { seconds: 0, isPlaying: false },
    playlist: [],
    chatHistory: [],
  };
  return (
    <section className={styles.room}>
      <div className={styles.view}>
        <Player src={selected} player={player} roomId={roomId} />
        <Controls playlist={playlist} selected={selected} roomId={roomId} />
      </div>
      <Chat chatHistory={chatHistory} />
      {!room && <Loader />}
    </section>
  );
}

export default Room;
