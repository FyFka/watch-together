import { h } from "preact";
import SourceRow from "./sourceRow/sourceRow";
import styles from "./playlist.styles.css";

interface IPlaylistProps {
  playlist: string[];
  selectedSource: string;
  onSelectSource: (source: string) => void;
  onDeleteSource: (source: string) => void;
}

function Playlist({ playlist, selectedSource, onSelectSource, onDeleteSource }: IPlaylistProps) {
  return (
    <div className={styles.playlist}>
      <h3 className={styles.title}>Playlist</h3>
      {playlist.length > 0 && (
        <div className={styles.sources}>
          {playlist.map((source) => (
            <SourceRow
              key={source}
              source={source}
              selectedSource={selectedSource}
              onSelectSource={onSelectSource}
              onDeleteSource={onDeleteSource}
            />
          ))}
        </div>
      )}
      {playlist.length === 0 && <h4 className={styles.empty}>No video in playlist</h4>}
    </div>
  );
}

export default Playlist;
