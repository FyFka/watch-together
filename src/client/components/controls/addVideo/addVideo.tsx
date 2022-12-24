import { h } from "preact";
import { useState } from "preact/compat";
import { addToPlaylist } from "../../../api/video";
import Button from "../../button/button";
import styles from "./addVideo.styles.css";

interface IAddVideoProps {
  roomId: string;
}

function AddVideo({ roomId }: IAddVideoProps) {
  const [videoUrl, setVideoUrl] = useState("");

  const handleVideoUrlChange = (evt: h.JSX.TargetedEvent<HTMLInputElement>) => {
    setVideoUrl(evt.currentTarget.value);
  };

  const handleVideoUrlSubmit = (evt: h.JSX.TargetedEvent<HTMLFormElement>) => {
    evt.preventDefault();
    addToPlaylist(videoUrl, roomId);
    setVideoUrl("");
  };

  return (
    <form onSubmit={handleVideoUrlSubmit} className={styles.addVideo}>
      <input
        className={styles.field}
        value={videoUrl}
        onChange={handleVideoUrlChange}
        placeholder="Direct link to video file"
      />
      <Button type="submit" className={styles.submit}>
        Add
      </Button>
    </form>
  );
}

export default AddVideo;
