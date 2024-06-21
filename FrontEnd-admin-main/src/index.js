import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import Admin from "layouts/Admin.js";
import Login from "views/auth/Login";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/" component={Admin} />
      
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
