import { h } from "preact";
import { useState } from "preact/compat";
import Chat from "../../components/chat/chat";
import Controls from "../../components/controls/controls";
import Player from "../../components/player/player";
import { IMessage } from "../../types/Room";
import styles from "./room.styles.css";
import "video.js/dist/video-js.css";

interface IProfileProps {
  roomId: string;
}
function Profile({ roomId }: IProfileProps) {
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [videoSource, setVideoSource] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);

  const changeSource = (source: string) => {
    setVideoSource(source);
  };

  const addToPlaylist = (newVideo: string) => {
    setPlaylist([...playlist, newVideo]);
  };

  return (
    <section className={styles.room}>
      <div className={styles.view}>
        <Player src={videoSource} />
        <Controls
          playlist={playlist}
          selected={videoSource}
          changeSource={changeSource}
          addToPlaylist={addToPlaylist}
        />
      </div>
      <Chat chatHistory={chatHistory} />
    </section>
  );
}

export default Profile;
