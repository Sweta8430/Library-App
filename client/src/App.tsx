import React from "react";
import "./App.css";
import { Header } from "../src/Layouts/Header";
import { Footer } from "./Layouts/Footer";
import { HomePage } from "./Components/HomePage";
import { SearchBookPage } from "./Components/SeachBookPage";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./Components/checkout/BookCheckoutPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  //custom Auth Handler

  const authHandler = () => {
    history.push("/login");
  };
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={authHandler}
      >
        <Header />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchBookPage />
            </Route>
            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>
            <Route
              path="/login"
              render={() => <LoginWidget config={oktaConfig} />}
            ></Route>
            <Route path="/login/callback" component={LoginCallback} />
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};
