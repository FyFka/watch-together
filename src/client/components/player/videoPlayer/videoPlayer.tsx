import { h } from "preact";
import { memo, useEffect, useMemo, useRef } from "preact/compat";
import videojs, { VideoJsPlayer } from "video.js";
import styles from "./videoPlayer.styles.css";

interface IVideoPlayerProps {
  src?: string;
  onPlay: (seconds: number) => void;
  onPause: (seconds: number) => void;
}

function VideoPlayer({ src, onPlay, onPause }: IVideoPlayerProps) {
  const htmlPlayerRef = useRef<HTMLVideoElement>(null);
  const videoPlayer = useRef<VideoJsPlayer>();

  useEffect(() => {
    initPlayer();
    initPlayerEvents();

    return () => {
      videoPlayer.current?.dispose();
    };
  }, []);

  const initPlayer = () => {
    if (!htmlPlayerRef.current) return;
    videoPlayer.current = videojs(htmlPlayerRef.current, { fluid: true, controls: true });
  };

  const initPlayerEvents = () => {
    if (!videoPlayer.current) return;
    const player = videoPlayer.current;
    player.on("ready", () => {
      if (src) changeSource(src);
    });
    player.on("play", () => {
      onPlay(player.currentTime());
    });
    player.on("pause", () => {
      onPause(player.currentTime());
    });
  };

  const changeSource = (newSrc?: string) => {
    if (!videoPlayer.current) return;
    videoPlayer.current.src(newSrc || "");
  };

  useMemo(() => changeSource(src), [src]);
  return (
    <div className={styles.videoPlayer}>
      <video className={`${styles.htmlPlayer} video-js vjs-big-play-centered`} ref={htmlPlayerRef} />
    </div>
  );
}

export default memo(VideoPlayer, (prevProps, nextProps) => prevProps.src === nextProps.src);
