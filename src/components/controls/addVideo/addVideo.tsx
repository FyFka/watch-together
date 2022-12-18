import { h } from "preact";
import { useState } from "preact/compat";
import Button from "../../button/button";
import styles from "./addVideo.styles.css";

interface IAddVideoProps {
  add: (source: string) => void;
}

function AddVideo({ add }: IAddVideoProps) {
  const [videoUrl, setVideoUrl] = useState("");

  const handleVideoUrlChange = (evt: h.JSX.TargetedEvent<HTMLInputElement>) => {
    setVideoUrl(evt.currentTarget.value);
  };

  const handleVideoUrlSubmit = (evt: h.JSX.TargetedEvent<HTMLFormElement>) => {
    evt.preventDefault();
    add(videoUrl);
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
