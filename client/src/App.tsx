import React from "react";
import "./App.css";
import { Header } from "../src/Layouts/Header";
import { ExploreTopBooks } from "./Components/ExploreTopBooks";

function App() {
  return (
    <div className="App">
      <Header />
      <ExploreTopBooks />
    </div>
  );
}

export default App;
