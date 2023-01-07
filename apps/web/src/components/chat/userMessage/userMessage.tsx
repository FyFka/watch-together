import data, { Emoji } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { h } from "preact";
import { ChangeEvent } from "preact/compat";
import { useState } from "preact/hooks";
import styles from "./userMessage.styles.css";

function UserMessage() {
  const [expandEmojiPicker, setExpandEmojiPicker] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleMessageInput = (evt: KeyboardEvent) => {
    if (evt.key === "Enter" && !evt.shiftKey) {
      evt.preventDefault();
      if (evt.currentTarget instanceof HTMLTextAreaElement) {
        setMessage("");
      }
    }
  };

  const handleMessageChange = (evt: ChangeEvent) => {
    if (evt.currentTarget instanceof HTMLTextAreaElement) {
      setMessage(evt.currentTarget.value);
    }
  };

  const handleToggleEmojiPicker = () => {
    setExpandEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
  };

  const handleEmojiSelect = (emoji: Emoji & { native: string }) => {
    setMessage((prevMessage) => `${prevMessage}${emoji.native}`);
  };

  const handleCloseEmojiPicker = () => {
    setExpandEmojiPicker(false);
  };

  return (
    <div className={styles.userMessage}>
      <textarea
        className={styles.inputMessage}
        placeholder="Enter a message"
        onKeyDown={handleMessageInput}
        maxLength={250}
        onChange={handleMessageChange}
        value={message}
      />
      {expandEmojiPicker && (
        <div className={styles.emojiPickerContainer}>
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            onClickOutside={handleCloseEmojiPicker}
            theme="dark"
            emojiSize={18}
            emojiButtonSize={28}
          />
        </div>
      )}
      <div className={styles.emojiContainer}>
        <button className={styles.emoji} onClick={handleToggleEmojiPicker}>
          <svg className={styles.emojiIcon} viewBox="0 0 24 24" fill="#fff">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default UserMessage;
