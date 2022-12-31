import { h, Fragment } from "preact";
import { Route, Router } from "preact-router";
import { useEffect } from "preact/compat";
import { IAccount, IExtendedAccount } from "types/src/Account";
import { IExternalEvent } from "types/src/ExternalEvent";
import { getAccount, subscribeToAccount } from "../api/account";
import { subscribeToNewAccount } from "../api/auth";
import { reconnect } from "../api/connection";
import Home from "../routes/home/home";
import Room from "../routes/room/room";
import { setAccount } from "../store/account/accountSlice";
import { useAppDispatch } from "../store/hooks";
import { saveToLocalStorage } from "../utils/localStorage";
import Footer from "./footer/footer";
import Header from "./header/header";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeFromNewAccount = subscribeToNewAccount(onNewAccount);
    const unsubscribeFromAccount = subscribeToAccount(onAccount);
    getAccount();

    return () => {
      unsubscribeFromNewAccount();
      unsubscribeFromAccount();
    };
  }, []);

  const onAccount = (extEvt: IExternalEvent<IAccount>) => {
    if (extEvt.payload) {
      dispatch(setAccount(extEvt.payload));
    } else {
      alert(extEvt.message);
    }
  };

  const onNewAccount = (extEvt: IExternalEvent<IExtendedAccount>) => {
    if (extEvt.payload) {
      const { token } = extEvt.payload;
      saveToLocalStorage("token", token);
      reconnect(extEvt.payload.token);
    } else {
      alert(extEvt.message);
    }
  };

  return (
    <Fragment>
      <Header />
      <main id="main">
        <Router>
          <Route path="/" component={Home} />
          <Route path="/room/:roomId" component={Room} />
        </Router>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
