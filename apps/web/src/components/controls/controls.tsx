import { h } from "preact";
import AddVideo from "./addVideo/addVideo";
import Playlist from "./playlist/playlist";
import Settings from "./settings/settings";
import styles from "./controls.styles.css";
import { selectVideo, subscribeToPlaylist, subscribeToSelect } from "../../api/video";
import { useEffect } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { useAppDispatch } from "../../store/hooks";
import { setPlaylist, setSelected } from "../../store/room/roomSlice";

interface IControlsProps {
  playlist: string[];
  selected: string;
  roomId: string;
}

function Controls({ playlist, selected, roomId }: IControlsProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeFromPlaylist = subscribeToPlaylist(onPlaylist);
    const unsubscribeFromSelect = subscribeToSelect(onChangeSelect);

    return () => {
      unsubscribeFromPlaylist();
      unsubscribeFromSelect();
    };
  }, []);

  const onChangeSelect = (extEvt: IExternalEvent<string>) => {
    if (extEvt.payload) {
      dispatch(setSelected(extEvt.payload));
    } else {
      alert(extEvt.message);
    }
  };

  const onPlaylist = (extEvt: IExternalEvent<string[]>) => {
    if (extEvt.payload) {
      dispatch(setPlaylist(extEvt.payload));
    } else {
      alert(extEvt.message);
    }
  };

  const handleSelectVideo = (src: string) => {
    selectVideo(src, roomId);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.left}>
        <AddVideo roomId={roomId} playlist={playlist} />
        <Settings />
      </div>
      <div className={styles.right}>
        <Playlist playlist={playlist} selected={selected} onSelectVideo={handleSelectVideo} />
      </div>
    </div>
  );
}

export default Controls;
