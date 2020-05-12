import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Chat from "./components/Chat/Chat";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import Header from "./components/Header/Header";
import TutorialPage from "./components/TutorialPage/TutorialPage";
import ForgotPasswordPage from "./components/FindPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/FindPasswordPage/ResetPasswordPage";

// Higher Order Component로 일반 컴포넌트를 감싸주자.
function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/tutorial" component={Auth(TutorialPage, null)} />
          <Route exact path="/chat" component={Auth(Chat, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/forgot"
            component={Auth(ForgotPasswordPage, false)}
          />
          <Route
            path="/reset/:token"
            component={Auth(ResetPasswordPage, false)}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
