import { h } from "preact";
import AddVideo from "./addVideo/addVideo";
import Playlist from "./playlist/playlist";
import Settings from "./settings/settings";
import styles from "./controls.styles.css";

interface IControlsProps {
  playlist: string[];
  selected: string;
  changeSource: (source: string) => void;
  addToPlaylist: (source: string) => void;
}

function Controls({ playlist, selected, changeSource, addToPlaylist }: IControlsProps) {
  const handleActiveChange = (src: string) => {
    changeSource(src);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.left}>
        <AddVideo add={addToPlaylist} />
        <Settings />
      </div>
      <div className={styles.right}>
        <Playlist playlist={playlist} selected={selected} onActiveChange={handleActiveChange} />
      </div>
    </div>
  );
}

export default Controls;
