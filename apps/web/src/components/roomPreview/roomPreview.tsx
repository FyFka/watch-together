import { h } from "preact";
import { Link } from "preact-router";
import { IRoom } from "types/src/Room";
import styles from "./roomPreview.styles.css";

interface IRoomPreviewProps {
  room: IRoom;
}

function RoomPreview({ room }: IRoomPreviewProps) {
  return (
    <Link className={styles.roomPreview} href={`/room/${room.id}`}>
      <h2 className={styles.title}>{room.name}</h2>
    </Link>
  );
}

export default RoomPreview;
