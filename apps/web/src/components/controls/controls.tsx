import { h } from "preact";
import AddSource from "./addSource/addSource";
import Playlist from "./playlist/playlist";
import Settings from "./settings/settings";
import styles from "./controls.styles.css";
import {
  deleteSource,
  selectSource,
  subscribeToDeleteSource,
  subscribeToPlaylist,
  subscribeToSelectSource,
} from "../../api/video";
import { useEffect } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { useAppDispatch } from "../../store/hooks";
import { setSources, setSelectedSource } from "../../store/room/roomSlice";

interface IControlsProps {
  sources: string[];
  selectedSource: string;
  roomId: string;
}

function Controls({ sources, selectedSource, roomId }: IControlsProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeFromPlaylist = subscribeToPlaylist(onPlaylistChange);
    const unsubscribeFromSelectSource = subscribeToSelectSource(onSelectSource);
    const unsubscribeFromDeleteSource = subscribeToDeleteSource(onPlaylistChange);

    return () => {
      unsubscribeFromPlaylist();
      unsubscribeFromSelectSource();
      unsubscribeFromDeleteSource();
    };
  }, []);

  const onSelectSource = (extEvt: IExternalEvent<string>) => {
    if (extEvt.payload) {
      dispatch(setSelectedSource(extEvt.payload));
    } else {
      alert(extEvt.message);
    }
  };

  const onPlaylistChange = (extEvt: IExternalEvent<string[]>) => {
    if (extEvt.payload) {
      dispatch(setSources(extEvt.payload));
    } else {
      alert(extEvt.message);
    }
  };

  const handleSelectSource = (src: string) => {
    selectSource(src, roomId);
  };

  const handleDeleteSource = (src: string) => {
    deleteSource(src, roomId);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.left}>
        <AddSource roomId={roomId} sources={sources} />
        <Settings />
      </div>
      <div className={styles.right}>
        <Playlist
          sources={sources}
          selectedSource={selectedSource}
          onSelectSource={handleSelectSource}
          onDeleteSource={handleDeleteSource}
        />
      </div>
    </div>
  );
}

export default Controls;
