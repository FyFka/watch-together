import { h } from "preact";
import { IMessage } from "types/src/Room";
import { memo, useState } from "preact/compat";
import Message from "./message/message";
import styles from "./chat.styles.css";
import Button from "../button/button";
import UserMessage from "./userMessage/userMessage";

interface IChatProps {
  chatHistory: IMessage[];
}

function Chat({ chatHistory }: IChatProps) {
  const [messages] = useState<IMessage[]>(chatHistory);
  const [hidden, setHidden] = useState<boolean>(false);

  const handleToggleExpand = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  return (
    <aside className={styles.chat}>
      <Button onClick={handleToggleExpand} className={`${styles.toggleHide} ${hidden ? styles.reverse : ""}`}>
        <svg className={styles.hideIcon} fill="none" viewBox="0 0 24 24">
          <g fill="#0f0f0f" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M1.95 12c0 .414.336.75.75.75h18.5a.75.75 0 0 0 0-1.5H2.7a.75.75 0 0 0-.75.75Z" />
            <path d="M14.17 4.47a.75.75 0 0 0 0 1.06l6.292 6.293a.25.25 0 0 1 0 .354L14.17 18.47a.75.75 0 1 0 1.06 1.06l6.293-6.293a1.75 1.75 0 0 0 0-2.474L15.23 4.47a.75.75 0 0 0-1.06 0Z" />
          </g>
        </svg>
      </Button>
      <div className={`${styles.chatContent} ${hidden ? styles.chatHidden : ""}`}>
        <div className={styles.head}>
          <h4 className={styles.chatName}>Main Chat</h4>
        </div>
        <div className={styles.history}>
          {messages.map(({ avatar, message, username, sentAt }) => (
            <Message key={sentAt} avatar={avatar} username={username} message={message} sentAt={sentAt} />
          ))}
        </div>
        <UserMessage />
      </div>
    </aside>
  );
}

export default memo(Chat, (prevProps, nextProps) => prevProps.chatHistory === nextProps.chatHistory);
