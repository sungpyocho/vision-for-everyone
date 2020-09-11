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
import EditProfilePage from "./components/EditProfilePage/EditProfilePage";
import KakaopaySuccessPage from "./components/KakaoPayPage/Success";
import KakaopayFailPage from "./components/KakaoPayPage/Fail";
import KakaopayCancelPage from "./components/KakaoPayPage/Cancel";

// Higher Order Component로 일반 컴포넌트를 감싸주자.
function App() {
  const isKakaoPay = window.location.pathname.split('/');

  return (
    <Router>
      <div>
        {isKakaoPay === 'kakaopay' ? null : <Header />}
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/tutorial" component={Auth(TutorialPage, null)} />
          <Route exact path="/chat" component={Auth(Chat, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/edit" component={Auth(EditProfilePage, true)} />
          <Route
            exact
            path="/forgot"
            component={Auth(ForgotPasswordPage, false)}
          />
          <Route
            path="/reset/:token"
            component={Auth(ResetPasswordPage, false)}
          />
          <Route
            path="/kakaopay/success"
            component={Auth(KakaopaySuccessPage, null)}
          />
          <Route
            path="/kakaopay/fail"
            component={Auth(KakaopayFailPage, null)}
          />
          <Route
            path="/kakaopay/cancel"
            component={Auth(KakaopayCancelPage, null)}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
