import { h } from "preact";
import { useState } from "preact/compat";
import { addToPlaylist } from "../../../api/video";
import { VIDEO_EXTENSIONS } from "../../../constants";
import Button from "../../button/button";
import styles from "./addSource.styles.css";

interface IAddSourceProps {
  roomId: string;
  sources: string[];
}

function AddSource({ sources, roomId }: IAddSourceProps) {
  const [source, setSource] = useState("");
  const [activeError, setActiveError] = useState("");

  const handleSourceSubmit = (evt: h.JSX.TargetedEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (activeError) return;
    const clearSource = source.trim();
    addToPlaylist(clearSource, roomId);
    setSource("");
  };

  const checkErrors = (source: string) => {
    const clearSource = source.trim();
    if (clearSource === "") {
      return "Video link is required";
    } else if (sources.includes(clearSource)) {
      return "Video is already in playlist";
    } else if (!VIDEO_EXTENSIONS.test(clearSource)) {
      return "Video file extension is not supported";
    }
    return "";
  };

  const handleSourceChange = (evt: h.JSX.TargetedEvent<HTMLInputElement>) => {
    setSource(evt.currentTarget.value);
    const currentError = checkErrors(evt.currentTarget.value);
    if (currentError !== activeError) setActiveError(currentError);
  };

  const hasActiveError = Boolean(activeError);
  return (
    <form onSubmit={handleSourceSubmit} className={styles.addSource} data-error={hasActiveError}>
      <div className={styles.content}>
        <input
          className={styles.field}
          value={source}
          onChange={handleSourceChange}
          placeholder="Direct link to video file"
          data-error={hasActiveError}
        />
        <Button type="submit" className={styles.submit}>
          ADD
        </Button>
      </div>
      {hasActiveError && <div className={styles.error}>{activeError}</div>}
    </form>
  );
}

export default AddSource;
