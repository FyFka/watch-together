import { h, Fragment } from "preact";
import { Route, Router } from "preact-router";
import Header from "./header/header";
import Home from "../routes/home/home";
import Profile from "../routes/room/room";
import Footer from "./footer/footer";

function App() {
  return (
    <Fragment>
      <Header />
      <main id="main">
        <Router>
          <Route path="/" component={Home} />
          <Route path="/room/:roomId" component={Profile} />
        </Router>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
