import { h } from "preact";
import { IMessage } from "types/src/Room";
import { memo, useState } from "preact/compat";
import Message from "./message/message";
import styles from "./chat.styles.css";

interface IChatProps {
  chatHistory: IMessage[];
}

function Chat({ chatHistory }: IChatProps) {
  const [messages, setMessages] = useState<IMessage[]>(chatHistory);

  const handleMessageInput = (evt: KeyboardEvent) => {
    if (evt.key === "Enter" && !evt.shiftKey) {
      evt.preventDefault();
      if (evt.currentTarget instanceof HTMLTextAreaElement) {
        const message = evt.currentTarget.value;
        const sentAt = Date.now();
        const newMessage = {
          avatar: "https://avatars.githubusercontent.com/u/76843185?v=4",
          username: "FyFka",
          message,
          sentAt,
        };
        setMessages([...messages, newMessage]);
        evt.currentTarget.value = "";
      }
    }
  };

  return (
    <aside className={styles.chat}>
      <div className={styles.info}>
        <h4 className={styles.chatName}>Main Chat</h4>
      </div>
      <div className={styles.history}>
        {messages.map(({ avatar, message, username, sentAt }) => (
          <Message key={sentAt} avatar={avatar} username={username} message={message} sentAt={sentAt} />
        ))}
      </div>
      <div className={styles.userMessage}>
        <textarea placeholder="Enter a message" onKeyDown={handleMessageInput} className={styles.inputMessage} />
      </div>
    </aside>
  );
}

export default memo(Chat, (prevProps, nextProps) => prevProps.chatHistory === nextProps.chatHistory);
