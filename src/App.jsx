// import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";

function App() {
  //     // 1984 book path
  //   const bookISBN = "9780451524935";
  //   const bookUrl = `https://covers.openlibrary.org/b/isbn/${bookISBN}-M.jpg`;

  function getBook(bookId) {
    return `https://covers.openlibrary.org/b/isbn/${bookId}-M.jpg`;
  }

  return (
    <>
      <Header
        title={"Books Memory Game"}
        desc={
          "Get points by clicking on a book but don't click on any more than once!"
        }
        score={0}
        bestScore={0}
      />

      <Card cardText={"1984"} imageUrl={getBook("0451524934")} />
      <Card cardText={"The Great Gatsby"} imageUrl={getBook("0684830426")} />
      <Card
        cardText={"To Kill a Mockingbird"}
        imageUrl={getBook("0060935464")}
      />
    </>
  );
}

export default App;
