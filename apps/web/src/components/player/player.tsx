import { h } from "preact";
import { useCallback, useEffect, useRef } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IPlayer } from "types/src/Room";
import throttle from "lodash/throttle";
import { subscribeToPause, subscribeToPlay, seekVideo, subscribeToSeek, playVideo, pauseVideo } from "../../api/video";
import styles from "./player.styles.css";
import Plyr, { PlyrEvent } from "plyr";
import Hls from "hls.js";
import { getPlayerTime } from "../../utils/player";
import { ACTION_DELAY } from "../../constants";
import "plyr/dist/plyr.css";

interface IPlayerProps {
  src: string;
  player: IPlayer;
  roomId: string;
}

function Player({ src, player, roomId }: IPlayerProps) {
  const HTMLPlayerRoot = useRef<HTMLVideoElement>(null);
  const webPlayer = useRef<Plyr>(null);
  const hls = useRef<Hls>(null);

  useEffect(() => {
    initPlayer();

    const unsubscribeFromPlay = subscribeToPlay(onPlay);
    const unsubscribeFromPause = subscribeToPause(onPause);
    const unsubscribeFromSeek = subscribeToSeek(onSeek);

    return () => {
      unsubscribeFromPlay();
      unsubscribeFromPause();
      unsubscribeFromSeek();
    };
  }, []);

  const initPlayer = () => {
    if (Hls.isSupported()) {
      hls.current = new Hls();
      window.hls = hls.current;
    }
    webPlayer.current = new Plyr(HTMLPlayerRoot.current, {
      debug: false,
      controls: ["play", "play-large", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
      listeners: {
        play() {
          handleTogglePlay();
          return false;
        },
        pause() {
          handleTogglePlay();
          return false;
        },
        seek(evt: PlyrEvent) {
          handleSeek(evt);
          return false;
        },
      },
    });
  };

  const loadVideo = (source: string) => {
    if (!webPlayer.current || !HTMLPlayerRoot.current) return;
    if (Hls.isSupported()) {
      hls.current.loadSource(source);
      hls.current.attachMedia(HTMLPlayerRoot.current);
    } else {
      webPlayer.current.source = {
        type: "video",
        sources: [{ src: source }],
      };
    }
  };

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

  useEffect(() => {
    loadVideo(src);
  }, [src]);

  return (
    <div className={styles.player}>
      <video className={styles.libPlayer} ref={HTMLPlayerRoot} />
    </div>
  );
}

export default Player;
