import React from "react";
import ReactDOM from "react-dom";
import { Redirect, Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import CustomProperties from "react-custom-properties";
import "./index.css";

import Home from "./WebPages/Home/Home";
import Connection from "./WebPages/Connection/Connection";
import Recovery from "./WebPages/Recovery/Recovery";
import Help from "./WebPages/Help/Help";
import Profile from "./WebPages/Profile/Profile";
import Search from "./WebPages/Search/Search";
import style from "./style.json";
import theme from "./theme.json";
// mock or not the api call by redefining the fetch function

if (process.env.REACT_APP_FETCH_MOCK === "true") {
  (global as any).fetch = fetch;
}

ReactDOM.render(
  <CustomProperties global properties={theme}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/connection" component={Connection} />
        <Route exact path="/recovery" component={Recovery} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </CustomProperties>,
  document.getElementById("root")
);

serviceWorker.register();
