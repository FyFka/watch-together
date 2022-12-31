import { h } from "preact";
import Button from "../../../button/button";
import styles from "./videoRow.styles.css";

interface IVideoRowProps {
  onSelectVideo: (video: string) => void;
  videoSrc: string;
  selected?: string;
}

function VideoRow({ videoSrc, selected, onSelectVideo }: IVideoRowProps) {
  const handleSelectVideo = () => {
    onSelectVideo(videoSrc);
  };

  return (
    <Button onClick={handleSelectVideo} className={styles.video} disabled={videoSrc === selected}>
      {videoSrc}
    </Button>
  );
}

export default VideoRow;
