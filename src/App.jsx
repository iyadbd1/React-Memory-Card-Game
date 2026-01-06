// import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";

function App() {
  return (
    <Header
      title={"Books Memory Game"}
      desc={
        "Get points by clicking on an image but don't click on any more than once!"
      }
      score={0}
      bestScore={0}
    />
  );
}

export default App;
