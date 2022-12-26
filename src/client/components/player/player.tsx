import { h } from "preact";
import { useEffect } from "preact/hooks";
import { pauseVideo, playVideo, subscribeToPause, subscribeToPlay } from "../../api/video";
import VideoPlayer from "./videoPlayer/videoPlayer";

interface IPlayerProps {
  src: string;
  roomId: string;
}

function Player({ src, roomId }: IPlayerProps) {
  useEffect(() => {
    const unsubscribeFromPlay = subscribeToPlay();
    const unsubscribeFromPause = subscribeToPause();

    return () => {
      unsubscribeFromPlay();
    };
  }, []);

  const handlePause = (seconds: number) => {
    pauseVideo(seconds, roomId);
  };

  const handlePlay = (seconds: number) => {
    playVideo(seconds, roomId);
  };

  return <VideoPlayer src={src} onPause={handlePause} onPlay={handlePlay} />;
}

export default Player;
