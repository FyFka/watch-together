import { h, Fragment } from "preact";
import { Route, Router } from "preact-router";
import { useEffect } from "preact/compat";
import { IAccount } from "types/src/Account";
import { IExternalEvent } from "types/src/ExternalEvent";
import {
  getAccount,
  subscribeToAccount,
  subscribeToCreatedAccount,
  subscribeToCreatedCustomAccount,
  subscribeToLogin,
} from "../api/account";
import { reconnect, subscribeToConnection } from "../api/connection";
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
    const unsubscribeFromConnection = subscribeToConnection(onConnectionChange);
    const unsubscribeFromCreatedAccount = subscribeToCreatedAccount(onChangeAccount);
    const unsubscribeFromCreatedCustomAccount = subscribeToCreatedCustomAccount(onChangeAccount);
    const unsubscribeFromLogin = subscribeToLogin(onChangeAccount);
    const unsubscribeFromAccount = subscribeToAccount(onAccount);

    return () => {
      unsubscribeFromConnection();
      unsubscribeFromCreatedCustomAccount();
      unsubscribeFromCreatedAccount();
      unsubscribeFromAccount();
      unsubscribeFromLogin();
    };
  }, []);

  const onConnectionChange = (connectionId: string) => {
    if (connectionId) {
      getAccount();
    }
  };

  const onAccount = (extEvt: IExternalEvent<IAccount>) => {
    if (extEvt.payload) {
      dispatch(setAccount(extEvt.payload));
    } else {
      alert(extEvt.message);
    }
  };

  const onChangeAccount = (extEvt: IExternalEvent<string>) => {
    if (extEvt.payload) {
      const token = extEvt.payload;
      saveToLocalStorage("token", token);
      reconnect(token);
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
