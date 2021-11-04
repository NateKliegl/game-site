import "./App.css";
import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Menu from "./components/Menu";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <ProtectedRoutes armor={false} path="/signup">
          <Signup />
        </ProtectedRoutes>
        <ProtectedRoutes armor={false} path="/login">
          <LoginPage />
        </ProtectedRoutes>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
