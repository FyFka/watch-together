import { h } from "preact";
import { useEffect, useRef } from "preact/compat";
import ReactPlayer from "react-player/lazy";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IPlayer } from "types/src/Room";
import { subscribeToPause, subscribeToPlay, seekVideo, subscribeToSeek, playVideo, pauseVideo } from "../../api/video";
import { useAppDispatch } from "../../store/hooks";
import { setPlayer } from "../../store/room/roomSlice";
import styles from "./player.styles.css";

interface IPlayerProps {
  src: string;
  player: IPlayer;
  roomId: string;
}

function Player({ src, player, roomId }: IPlayerProps) {
  const HTMLPlayer = useRef<ReactPlayer>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeFromPlay = subscribeToPlay(onPlay);
    const unsubscribeFromPause = subscribeToPause(onPause);
    const unsubscribeFromSeek = subscribeToSeek(onSeek);

    return () => {
      unsubscribeFromPlay();
      unsubscribeFromPause();
      unsubscribeFromSeek();
    };
  }, []);

  const onPlay = (extEvt: IExternalEvent<IPlayer>) => {
    if (extEvt.payload) {
      dispatch(setPlayer(extEvt.payload));
    }
  };

  const onPause = (extEvt: IExternalEvent<IPlayer>) => {
    if (extEvt.payload) {
      dispatch(setPlayer(extEvt.payload));
    }
  };

  const onSeek = (extEvt: IExternalEvent<IPlayer>) => {
    if (extEvt.payload) {
      dispatch(setPlayer(extEvt.payload));
    }
  };

  const handlePause = () => {
    if (HTMLPlayer.current) {
      const seconds = HTMLPlayer.current.getCurrentTime();
      pauseVideo(seconds, roomId);
    }
  };

  const handleSeek = (seconds: number) => {
    seekVideo(seconds, player.isPlaying, roomId);
  };

  const handlePlay = () => {
    if (HTMLPlayer.current) {
      const seconds = HTMLPlayer.current.getCurrentTime();
      playVideo(seconds, roomId);
    }
  };

  return (
    <div className={styles.player}>
      <ReactPlayer
        ref={HTMLPlayer}
        className={styles.htmlPlayer}
        width="100%"
        height="100%"
        url={src}
        onPause={handlePause}
        onSeek={handleSeek}
        onPlay={handlePlay}
        playing
        controls
        muted
      />
    </div>
  );
}

export default Player;
