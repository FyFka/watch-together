import { h } from "preact";
import { useState } from "preact/compat";
import { addToPlaylist } from "../../../api/video";
import { VIDEO_EXTENSIONS } from "../../../constants";
import Button from "../../button/button";
import styles from "./addVideo.styles.css";

interface IAddVideoProps {
  roomId: string;
  playlist: string[];
}

function AddVideo({ playlist, roomId }: IAddVideoProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [activeError, setActiveError] = useState("");

  const handleVideoUrlSubmit = (evt: h.JSX.TargetedEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (activeError) return;
    const clearUrl = videoUrl.trim();
    addToPlaylist(clearUrl, roomId);
    setVideoUrl("");
  };

  const checkErrors = (url: string) => {
    const clearUrl = url.trim();
    if (!clearUrl) {
      return "Please enter video url";
    } else if (playlist.includes(clearUrl)) {
      return "Video already in playlist";
    } else if (!VIDEO_EXTENSIONS.test(clearUrl)) {
      return "Video file extension is not supported";
    }
    return "";
  };

  const handleVideoUrlChange = (evt: h.JSX.TargetedEvent<HTMLInputElement>) => {
    setVideoUrl(evt.currentTarget.value);
    const currentError = checkErrors(evt.currentTarget.value);
    if (currentError !== activeError) setActiveError(currentError);
  };

  const hasError = !!activeError;
  return (
    <form onSubmit={handleVideoUrlSubmit} className={styles.addVideo} data-error={hasError}>
      <div className={styles.content}>
        <input
          className={styles.field}
          value={videoUrl}
          onChange={handleVideoUrlChange}
          placeholder="Direct link to video file"
          data-error={hasError}
        />
        <Button type="submit" className={styles.submit}>
          Add
        </Button>
      </div>
      {hasError && <div className={styles.error}>{activeError}</div>}
    </form>
  );
}

export default AddVideo;
