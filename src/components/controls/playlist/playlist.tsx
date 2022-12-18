import { h } from "preact";
import Button from "../../button/button";
import styles from "./playlist.styles.css";

interface IPlaylistProps {
  playlist: string[];
  selected?: string;
  onActiveChange: (video: string) => void;
}

function Playlist({ playlist, selected, onActiveChange }: IPlaylistProps) {
  return (
    <div className={styles.playlist}>
      <h3 className={styles.title}>Playlist</h3>
      {playlist.length > 0 && (
        <ul className={styles.list}>
          {playlist.map((video) => (
            <li key={video}>
              <Button
                onClick={() => {
                  onActiveChange(video);
                }}
                className={styles.video}
                disabled={video === selected}
              >
                {video}
              </Button>
            </li>
          ))}
        </ul>
      )}
      {playlist.length === 0 && <h4 className={styles.empty}>No video in playlist</h4>}
    </div>
  );
}

export default Playlist;
