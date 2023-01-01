import { h } from "preact";
import { useEffect, useRef } from "preact/compat";
import videojs, { VideoJsPlayer } from "video.js";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IPlayer } from "types/src/Room";
import { pauseVideo, playVideo, subscribeToPause, subscribeToPlay } from "../../api/video";
import styles from "./player.styles.css";

interface IPlayerProps {
  src: string;
  roomId: string;
}

function Player({ src, roomId }: IPlayerProps) {
  const htmlPlayerRef = useRef<HTMLVideoElement>(null);
  const videoPlayer = useRef<VideoJsPlayer>();

  useEffect(() => {
    const unsubscribeFromPlay = subscribeToPlay(play);
    const unsubscribeFromPause = subscribeToPause(pause);
    initPlayer();
    initPlayerEvents();

    return () => {
      unsubscribeFromPlay();
      unsubscribeFromPause();
      videoPlayer.current?.dispose();
    };
  }, []);

  useEffect(() => {
    changeSource(src);
  }, [src]);

  const initPlayer = () => {
    if (!htmlPlayerRef.current) return;
    videoPlayer.current = videojs(htmlPlayerRef.current, {
      fluid: true,
      controls: true,
      defaultVolume: 0,
    });
  };

  const initPlayerEvents = () => {
    if (!videoPlayer.current) return;
    const player = videoPlayer.current;
    player.on("ready", () => {
      if (src) changeSource(src);
    });
    player.on("play", () => {
      handlePlay(player.currentTime());
    });
    player.on("pause", () => {
      handlePause(player.currentTime());
    });
  };

  const play = (extEvt: IExternalEvent<IPlayer>) => {
    if (extEvt.payload && videoPlayer.current) {
      videoPlayer.current.currentTime(extEvt.payload.seconds);
      videoPlayer.current.play();
    }
  };

  const pause = (extEvt: IExternalEvent<IPlayer>) => {
    if (extEvt.payload && videoPlayer.current) {
      videoPlayer.current.currentTime(extEvt.payload.seconds);
      videoPlayer.current.pause();
    }
  };

  const handlePause = (seconds: number) => {
    pauseVideo(seconds, roomId);
  };

  const handlePlay = (seconds: number) => {
    playVideo(seconds, roomId);
  };

  const changeSource = (newSrc?: string) => {
    if (!videoPlayer.current) return;
    videoPlayer.current.src(newSrc || "");
  };

  return (
    <div className={styles.player}>
      <video className={`${styles.htmlPlayer} video-js vjs-big-play-centered`} ref={htmlPlayerRef} />
    </div>
  );
}

export default Player;