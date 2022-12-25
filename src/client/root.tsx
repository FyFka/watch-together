import { h } from "preact";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./components/app";

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
