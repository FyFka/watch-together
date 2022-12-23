import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import Chat from "../../components/chat/chat";
import Controls from "../../components/controls/controls";
import Player from "../../components/player/player";
import { IMessage, IRoom } from "../../../shared/Room";
import { joinRoom, subscribeToJoinRoom, unsubscribeFromJoinRoom } from "../../api/room";
import { IResponse } from "../../../shared/Response";
import styles from "./room.styles.css";
import "video.js/dist/video-js.css";

interface IRoomProps {
  roomId: string;
}

function Room({ roomId }: IRoomProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);

  useEffect(() => {
    subscribeToJoinRoom(handleJoinRoom);
    joinRoom(roomId);

    return () => {
      unsubscribeFromJoinRoom();
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

  const changeSource = (source: string) => {
    setSelected(source);
  };

  const addToPlaylist = (newVideo: string) => {
    setPlaylist([...playlist, newVideo]);
  };

  return (
    <section className={styles.room}>
      <div className={styles.view}>
        <Player src={selected} />
        <Controls playlist={playlist} selected={selected} changeSource={changeSource} addToPlaylist={addToPlaylist} />
      </div>
      <Chat chatHistory={chatHistory} />
      {loading && <div className={styles.loading}></div>}
    </section>
  );
}

export default Room;
