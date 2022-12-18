import { h, ComponentChildren } from "preact";
import styles from "./button.styles.css";

interface IButtonProps {
  children: ComponentChildren;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
}

function Button({ children, className, ...rest }: IButtonProps) {
  return (
    <button {...rest} className={`${styles.button} ${className}`}>
      <span className={styles.content}>{children}</span>
    </button>
  );
}

export default Button;
