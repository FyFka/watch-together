import { h } from "preact";
import SourceRow from "./sourceRow/sourceRow";
import styles from "./playlist.styles.css";

interface IPlaylistProps {
  sources: string[];
  selectedSource: string;
  onSelectSource: (source: string) => void;
  onDeleteSource: (source: string) => void;
}

function Playlist({ sources, selectedSource, onSelectSource, onDeleteSource }: IPlaylistProps) {
  return (
    <div className={styles.playlist}>
      <h3 className={styles.title}>Playlist</h3>
      {sources.length > 0 && (
        <div className={styles.sources}>
          {sources.map((source) => (
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
      {sources.length === 0 && <h4 className={styles.empty}>No video in playlist</h4>}
    </div>
  );
}

export default Playlist;
