import { h } from "preact";
import CreateRoom from "../../components/createRoom/createRoom";
import styles from "./home.styles.css";

const Home = () => (
  <section className={styles.home}>
    <h1 className={styles.homeIntro}>Watch together</h1>
    <CreateRoom />
  </section>
);

export default Home;
