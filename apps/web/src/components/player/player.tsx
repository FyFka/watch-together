import { h } from "preact";
import { useEffect, useRef } from "preact/compat";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IPlayer } from "types/src/Room";
import { subscribeToPause, subscribeToPlay, seekVideo, subscribeToSeek, playVideo, pauseVideo } from "../../api/video";
import styles from "./player.styles.css";
import Plyr from "plyr";
import Hls from "hls.js";

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
    initEvents();

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
    webPlayer.current = new Plyr(HTMLPlayerRoot.current, { controls: [], autoplay: true });
  };

  const initEvents = () => {
    if (!webPlayer.current) return;
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

  useEffect(() => {
    loadVideo(src);
  }, [src]);

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

  const handleTogglePlay = () => {
    if (!webPlayer.current) return;
    const currentTime = webPlayer.current.currentTime;
    if (webPlayer.current.playing) {
      pauseVideo(currentTime, roomId);
    } else {
      playVideo(currentTime, roomId);
    }
  };

  const handleSeek = (evt: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const seconds = Number(evt.currentTarget.value);
    seekVideo(seconds, player.isPlaying, roomId);
  };

  return (
    <div className={styles.player}>
      <video className={styles.libPlayer} ref={HTMLPlayerRoot} playsInline={true} />
      <div className={styles.ui}>
        <div className={styles.play} onClick={handleTogglePlay} />
        <div className={styles.controls}>
          <div className={styles.progress}>
            <input
              className={styles.seek}
              type="range"
              min="0"
              max="100"
              step="0.01"
              value="0"
              autocomplete="off"
              onChange={handleSeek}
            />
            <progress className={styles.loaded} min="0" max="100" value="50" />
          </div>
          <div className={styles.volume} />
        </div>
      </div>
    </div>
  );
}

export default Player;
