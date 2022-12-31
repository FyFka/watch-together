import { h } from "preact";
import styles from "./playlist.styles.css";
import VideoRow from "./videoRow/videoRow";

interface IPlaylistProps {
  playlist: string[];
  selected?: string;
  onSelectVideo: (video: string) => void;
}

function Playlist({ playlist, selected, onSelectVideo }: IPlaylistProps) {
  return (
    <div className={styles.playlist}>
      <h3 className={styles.title}>Playlist</h3>
      {playlist.length > 0 && (
        <ul className={styles.list}>
          {playlist.map((video) => (
            <li key={video}>
              <VideoRow videoSrc={video} onSelectVideo={onSelectVideo} selected={selected} />
            </li>
          ))}
        </ul>
      )}
      {playlist.length === 0 && <h4 className={styles.empty}>No video in playlist</h4>}
    </div>
  );
}

export default Playlist;
