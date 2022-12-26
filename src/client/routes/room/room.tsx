import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import Chat from "../../components/chat/chat";
import Controls from "../../components/controls/controls";
import { IMessage, IRoom } from "../../../shared/Room";
import { joinRoom, subscribeToJoinRoom } from "../../api/room";
import { IResponse } from "../../../shared/Response";
import styles from "./room.styles.css";
import "video.js/dist/video-js.css";
import { subscribeToPlaylist, subscribeToSelect } from "../../api/video";
import Player from "../../components/player/player";

interface IRoomProps {
  roomId: string;
}

function Room({ roomId }: IRoomProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);

  useEffect(() => {
    const unsubscribeFromJoinRoom = subscribeToJoinRoom(handleJoinRoom);
    const unsubscribeFromPlaylist = subscribeToPlaylist(handlePlaylist);
    const unsubscribeFromSelect = subscribeToSelect(handleChangeSelect);
    joinRoom(roomId);

    return () => {
      unsubscribeFromJoinRoom();
      unsubscribeFromPlaylist();
      unsubscribeFromSelect();
    };
  }, []);

  const handleJoinRoom = (res: IResponse<IRoom>) => {
    if (res.payload) {
      const { playlist, selected, chatHistory } = res.payload;
      setPlaylist(playlist);
      setSelected(selected);
      setChatHistory(chatHistory);
    } else if (res.message) {
      alert(res.message);
    }
    setLoading(false);
  };

  const handleChangeSelect = (res: IResponse<string>) => {
    if (res.payload) {
      setSelected(res.payload);
    } else {
      alert(res.message);
    }
  };

  const handlePlaylist = (res: IResponse<string[]>) => {
    if (res.payload) {
      setPlaylist(res.payload);
    } else {
      alert(res.message);
    }
  };

  return (
    <section className={styles.room}>
      <div className={styles.view}>
        <Player src={selected} roomId={roomId} />
        <Controls playlist={playlist} selected={selected} roomId={roomId} />
      </div>
      <Chat chatHistory={chatHistory} />
      {loading && <div className={styles.loading} />}
    </section>
  );
}

export default Room;
