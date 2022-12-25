import { h } from "preact";
import AddVideo from "./addVideo/addVideo";
import Playlist from "./playlist/playlist";
import Settings from "./settings/settings";
import styles from "./controls.styles.css";
import { selectVideo } from "../../api/video";

interface IControlsProps {
  playlist: string[];
  selected: string;
  roomId: string;
}

function Controls({ playlist, selected, roomId }: IControlsProps) {
  const handleActiveChange = (src: string) => {
    selectVideo(src, roomId);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.left}>
        <AddVideo roomId={roomId} />
        <Settings />
      </div>
      <div className={styles.right}>
        <Playlist playlist={playlist} selected={selected} onActiveChange={handleActiveChange} />
      </div>
    </div>
  );
}

export default Controls;
