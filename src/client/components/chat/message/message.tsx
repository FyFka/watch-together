import { h } from "preact";
import { IMessage } from "../../../../shared/Room";
import styles from "./message.styles.css";

interface IMessageProps extends IMessage {}

function Message({ message, username, avatar, sentAt }: IMessageProps) {
  return (
    <div className={styles.message}>
      <img src={avatar} className={styles.avatar} alt={`${username}'s avatar`} />
      <div>
        <div className={styles.info}>
          <p className={styles.username}>{username}</p>
          <p className={styles.time}>{new Date(sentAt).toLocaleString()}</p>
        </div>
        <p className={styles.userMessage}>{message}</p>
      </div>
    </div>
  );
}

export default Message;
