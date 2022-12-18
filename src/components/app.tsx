import { h, Fragment } from "preact";
import { Route, Router } from "preact-router";
import Header from "./header/header";
import Home from "../routes/home/home";
import Profile from "../routes/room/room";

const App = () => (
  <Fragment>
    <Header />
    <div id="main">
      <Router>
        <Route path="/" component={Home} />
        <Route path="/room/:roomId" component={Profile} />
      </Router>
    </div>
  </Fragment>
);

export default App;
