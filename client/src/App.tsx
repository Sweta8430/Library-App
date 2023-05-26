import React from "react";
import "./App.css";
import { Header } from "../src/Layouts/Header";
import { Footer } from "./Layouts/Footer";
import { HomePage } from "./Components/HomePage";
import { SearchBookPage } from "./Components/SeachBookPage";
import { Route, Switch, Redirect } from "react-router-dom";
import { BookCheckoutPage } from "./Components/checkout/BookCheckoutPage";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
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
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
