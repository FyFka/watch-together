import { h } from "preact";
import Intro from "../../components/intro/intro";
import LastRooms from "../../components/lastRooms/lastRooms";
import styles from "./home.styles.css";

function Home() {
  return (
    <div className={styles.home}>
      <Intro />
      <LastRooms />
    </div>
  );
}

export default Home;
