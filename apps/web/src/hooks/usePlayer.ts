import Hls from "hls.js";
import Plyr, { PlyrEvent } from "plyr";
import { useEffect, useRef } from "preact/compat";
import { MutableRef } from "preact/hooks";

interface IUsePlyr {
  root: MutableRef<HTMLVideoElement>;
  handlers: IHandlers;
}

interface IHandlers {
  handleTogglePlay: () => void;
  handleSeek: (evt: PlyrEvent) => void;
}

function usePlayer({ root, handlers: { handleTogglePlay, handleSeek } }: IUsePlyr) {
  const webPlayer = useRef<Plyr>(null);
  const hls = useRef<Hls>(null);

  useEffect(() => {
    initHls();
    initWebPlayer();

    return () => {
      webPlayer.current?.destroy();
      hls.current?.destroy();
    };
  }, []);

  const initHls = () => {
    if (Hls.isSupported()) {
      hls.current = new Hls({ lowLatencyMode: true, debug: false });
    }
  };

  const initWebPlayer = () => {
    webPlayer.current = new Plyr(root.current, {
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
    parseDigitalVideo("");
  };

  const parseStream = (source: string) => {
    hls.current.detachMedia();
    hls.current.loadSource(source);
    hls.current.attachMedia(webPlayer.current.media);
  };

  const parseDigitalVideo = (source: string) => {
    if (hls.current) hls.current.detachMedia();
    webPlayer.current.source = {
      type: "video",
      sources: [{ src: source }],
    };
  };

  const loadVideo = (source: string) => {
    if (!webPlayer.current) return;
    if (hls.current && source.includes(".m3u8")) {
      parseStream(source);
    } else {
      parseDigitalVideo(source);
    }
  };

  return { webPlayer, loadVideo };
}

export default usePlayer;
