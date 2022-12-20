import { h, Fragment } from "preact";
import { Route, Router } from "preact-router";
import Header from "./header/header";
import Home from "../routes/home/home";
import Profile from "../routes/room/room";
import Footer from "./footer/footer";
import { useEffect } from "preact/compat";
import { subscribeToNewAccount, unsubscribeFromNewAccount } from "../api/auth";
import { IResponse } from "../types/Response";
import { IExtendedAccount } from "../types/Account";
import { reconnect } from "../api/connection";
import { saveToLocalStorage } from "../utils/localStorage";

function App() {
  useEffect(() => {
    subscribeToNewAccount(handleNewAccount);

    return () => {
      unsubscribeFromNewAccount();
    };
  }, []);

  const handleNewAccount = (res: IResponse<IExtendedAccount>) => {
    if (res.payload) {
      const { token, account } = res.payload;
      saveToLocalStorage("token", token);
      saveToLocalStorage("cached_account", account);
      reconnect(res.payload.token);
    } else {
      alert(res.message);
    }
  };

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
