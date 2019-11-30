import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./configs/Reactotron";
import { GlobalStyles } from "./styles";

ReactDOM.render(
  <Fragment>
    <GlobalStyles />
    <App />
  </Fragment>,
  document.getElementById("root")
);
