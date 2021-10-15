import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Cart, Login, Register, Sandbox } from "./screens/index.js";
import "./App.css";
import Home from "./screens/Home";


const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/sandbox">
            <Sandbox />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
