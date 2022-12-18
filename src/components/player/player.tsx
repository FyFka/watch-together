import { h } from "preact";
import { memo, useEffect, useMemo, useRef } from "preact/compat";
import videojs, { VideoJsPlayer } from "video.js";
import styles from "./player.styles.css";

interface IPlayerProps {
  src?: string;
}

function Player({ src }: IPlayerProps) {
  const htmlPlayerRef = useRef<HTMLVideoElement>(null);
  const player = useRef<VideoJsPlayer>();

  useEffect(() => {
    if (!htmlPlayerRef.current) return;
    player.current = videojs(htmlPlayerRef.current, { fluid: true, controls: true });
    player.current.on("ready", () => {
      if (src) changeSource(src);
    });
  }, []);

  const changeSource = (newSrc?: string) => {
    if (!player.current) return;
    player.current.src(newSrc || "");
  };

  useMemo(() => changeSource(src), [src]);
  return (
    <div className={styles.player}>
      <video className={`${styles.htmlPlayer} video-js vjs-big-play-centered`} ref={htmlPlayerRef} />
    </div>
  );
}

export default memo(Player, (prevProps, nextProps) => prevProps.src === nextProps.src);
