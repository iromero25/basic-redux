import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./redux/store/store";

render(
  // Provider will make the store available to all the App.
  // But it is still up to every component to connect to it.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("container")
);
