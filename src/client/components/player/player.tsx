import { h } from "preact";
import VideoPlayer from "./videoPlayer/videoPlayer";

interface IPlayerProps {
  src?: string;
}

function Player({ src }: IPlayerProps) {
  const handlePause = (seconds: number) => {
    console.log("pause", seconds);
  };

  const handlePlay = (seconds: number) => {
    console.log("play", seconds);
  };

  return <VideoPlayer src={src} onPause={handlePause} onPlay={handlePlay} />;
}

export default Player;
