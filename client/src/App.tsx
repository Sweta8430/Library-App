import React from "react";
import "./App.css";
import { Header } from "../src/Layouts/Header";
import { Footer } from "./Layouts/Footer";
import { HomePage } from "./Components/HomePage";
import { SearchBookPage } from "./Components/SeachBookPage";

export const App = () => {
  return (
    <div className="App">
      <Header />
      {/* <HomePage /> */}
      <SearchBookPage />
      <Footer />
    </div>
  );
};
