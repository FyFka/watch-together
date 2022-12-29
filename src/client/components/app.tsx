import { h, Fragment } from "preact";
import { Route, Router } from "preact-router";
import { useEffect } from "preact/compat";
import { IAccount, IExtendedAccount } from "../../shared/Account";
import { IResponse } from "../../shared/Response";
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

  const onAccount = (res: IResponse<IAccount>) => {
    if (res.payload) {
      dispatch(setAccount(res.payload));
    } else {
      alert(res.message);
    }
  };

  const onNewAccount = (res: IResponse<IExtendedAccount>) => {
    if (res.payload) {
      const { token } = res.payload;
      saveToLocalStorage("token", token);
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
          <Route path="/room/:roomId" component={Room} />
        </Router>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
