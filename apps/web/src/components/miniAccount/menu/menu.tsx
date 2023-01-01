import { h } from "preact";
import { useState } from "preact/compat";
import { IAccount } from "types/src/Account";
import styles from "./menu.module.css";

interface IMenuProps {
  account: IAccount;
}

function Menu({ account }: IMenuProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <div tabIndex={0} className={styles.menu}>
      <div className={styles.profile}>
        <p className={styles.signedAs}>You are signed in as</p>
        <p className={styles.username}>{account.username}</p>
        <p className={styles.password}>
          Password:
          <span onClick={handleReveal} className={`${styles.passwordText} ${revealed ? "" : styles.hidden}`}>
            {account.password}
          </span>
        </p>
      </div>
      <div className={styles.menuOptions}>
        <button className={styles.option}>
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24">
            <g fill="#aaa">
              <circle cx="15" cy="8" r="4" />
              <path d="M15 20s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2zM6 10V7H4v3H1v2h3v3h2v-3h3v-2z" />
            </g>
          </svg>
          <span className={styles.text}>Create an account</span>
        </button>
        <button className={styles.option}>
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24">
            <path
              fill="#aaa"
              fill-rule="evenodd"
              d="M12 13c2.396 0 4.575.694 6.178 1.671.8.49 1.484 1.065 1.978 1.69.486.616.844 1.352.844 2.139 0 .845-.411 1.511-1.003 1.986-.56.45-1.299.748-2.084.956-1.578.417-3.684.558-5.913.558s-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C3.41 20.01 3 19.345 3 18.5c0-.787.358-1.523.844-2.139.494-.625 1.177-1.2 1.978-1.69C7.425 13.694 9.605 13 12 13Zm0-11a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
            />
          </svg>
          <span className={styles.text}>Login</span>
        </button>
        <button className={styles.option}>
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24">
            <path
              fill="#aaa"
              fill-rule="evenodd"
              d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558Zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929L17.997 7ZM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm.28-6H9.72l-.333 1h5.226l-.334-1Z"
            />
          </svg>
          <span className={styles.text}>Delete account</span>
        </button>
      </div>
      <button className={styles.signOut}>
        <svg className={styles.icon} fill="none" viewBox="0 0 24 24">
          <path
            stroke="#aaa"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15.016 7.39v-.934a3.685 3.685 0 0 0-3.685-3.685H6.456a3.685 3.685 0 0 0-3.684 3.685v11.13a3.685 3.685 0 0 0 3.684 3.686h4.885a3.675 3.675 0 0 0 3.675-3.674v-.944M21.81 12.021H9.767M18.881 9.106l2.928 2.915-2.928 2.916"
          />
        </svg>
        <span className={styles.text}>Sign out</span>
      </button>
    </div>
  );
}

export default Menu;
