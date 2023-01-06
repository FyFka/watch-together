import { h } from "preact";
import { useCallback, useEffect, useRef } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IPlayer } from "types/src/Room";
import throttle from "lodash/throttle";
import { subscribeToPause, subscribeToPlay, seekVideo, subscribeToSeek, playVideo, pauseVideo } from "../../api/video";
import styles from "./player.styles.css";
import { PlyrEvent } from "plyr";
import { getPlayerTime } from "../../utils/player";
import { ACTION_DELAY } from "../../constants";
import usePlayer from "../../hooks/usePlayer";
import "plyr/dist/plyr.css";

interface IPlayerProps {
  selectedSource: string;
  player: IPlayer;
  roomId: string;
}

function Player({ selectedSource, player, roomId }: IPlayerProps) {
  const HTMLPlayerRoot = useRef<HTMLVideoElement>(null);

  const handleTogglePlay = useCallback(
    throttle(() => {
      if (!webPlayer.current) return;
      const currentTime = webPlayer.current.currentTime;
      if (webPlayer.current.playing) {
        pauseVideo(currentTime, roomId);
      } else {
        playVideo(currentTime, roomId);
      }
    }, ACTION_DELAY),
    [roomId]
  );

  const handleSeek = useCallback(
    throttle((evt: PlyrEvent) => {
      if (!webPlayer.current) return;
      const targetTime = getPlayerTime(evt, webPlayer.current.duration);
      seekVideo(targetTime, player.isPlaying, roomId);
    }, ACTION_DELAY),
    [roomId]
  );

  const { webPlayer, loadVideo } = usePlayer({
    root: HTMLPlayerRoot,
    handlers: { handleTogglePlay, handleSeek },
  });

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

  const onPlay = (evt: IExternalEvent<IPlayer>) => {
    if (!webPlayer.current || !evt.payload) return;
    webPlayer.current.play();
  };

  const onPause = (evt: IExternalEvent<IPlayer>) => {
    if (!webPlayer.current || !evt.payload) return;
    webPlayer.current.pause();
  };

  const onSeek = (evt: IExternalEvent<IPlayer>) => {
    if (!webPlayer.current || !evt.payload) return;
    webPlayer.current.currentTime = evt.payload.seconds;
  };

  useEffect(() => {
    loadVideo(selectedSource);
  }, [selectedSource]);

  return (
    <div className={styles.player}>
      <video className={styles.rootPlayer} ref={HTMLPlayerRoot} />
    </div>
  );
}

export default Player;
