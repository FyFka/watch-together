import { h } from "preact";
import AddVideo from "./addVideo/addVideo";
import Playlist from "./playlist/playlist";
import Settings from "./settings/settings";
import styles from "./controls.styles.css";
import { selectVideo, subscribeToPlaylist, subscribeToSelect } from "../../api/video";
import { useEffect } from "preact/compat";
import { IResponse } from "../../../shared/Response";
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

  const onChangeSelect = (res: IResponse<string>) => {
    if (res.payload) {
      dispatch(setSelected(res.payload));
    } else {
      alert(res.message);
    }
  };

  const onPlaylist = (res: IResponse<string[]>) => {
    if (res.payload) {
      dispatch(setPlaylist(res.payload));
    } else {
      alert(res.message);
    }
  };

  const handleSelectVideo = (src: string) => {
    selectVideo(src, roomId);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.left}>
        <AddVideo roomId={roomId} />
        <Settings />
      </div>
      <div className={styles.right}>
        <Playlist playlist={playlist} selected={selected} onSelectVideo={handleSelectVideo} />
      </div>
    </div>
  );
}

export default Controls;
