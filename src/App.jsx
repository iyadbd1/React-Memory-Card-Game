import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Deck from "./components/Deck.jsx";

function App() {
  /* App State */
  // const [score, setScore] = useState(0);
  // const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Fetching and saving data from Open Library API */
  useEffect(() => {
    const popularISBNs = [
      // Classics & 20th Century
      "0684830426",
      "0451524934",
      "0060935464",
      "0316769487",
      "0143039431",
      "0060850523",
      "1840226358",
      "0618640150",
      "0679720200",
      "0060883286",
      "0486280616",
      "0140449116",
      "0141439513",
      "0141439602",
      "0451526341",
      "0140449264",
      "0141439556",
      "0140177396",
      "0451524934",
      "0394747232",

      // Modern Bestsellers & Fantasy
      "0593052447",
      "0439023521",
      "0316015849",
      "0747532745",
      "0439064872",
      "0439136369",
      "0439139600",
      "0439358078",
      "0439763672",
      "0545010225",
      "0307277674",
      "0307275558",
      "0385504209",
      "0062315005",
      "0316033413",
      "0743273567",
      "0345391802",
      "0375831002",
      "0375842209",
      "076790592X",

      // Contemporary & Literacy Favorites
      "1594480001",
      "0307277674",
      "1400034779",
      "0307348032",
      "0061120081",
      "0316316962",
      "0142437239",
      "0307387895",
      "0307265439",
      "0525478817",
      "0385537859",
      "0143110438",
      "1451673310",
      "1501110365",
      "1101904224",
      "0735211299",
      "0525559477",
      "0735219095",
      "0399563245",
      "1501111108",

      // Non-Fiction & Self-Help
      "0062316095",
      "0307463745",
      "081297381X",
      "1501124021",
      "0399590501",
      "198211048X",
      "0062457713",
      "0735213615",
      "150117133X",
      "1250178606",
      "0316204366",
      "1501124021",
      "1400033411",
      "1401308589",
      "0062316095",
      "0345816021",
      "0399184570",
      "081298160X",
      "1501132954",
      "0525536299",
    ];

    let ignore = false;

    async function fetchBooks() {
      try {
        setLoading(true);

        const query = popularISBNs.map((isbn) => `isbn:${isbn}`).join(" OR ");

        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        );

        const data = await response.json();
        if (!ignore) {
          // log data to console
          console.log(data.docs);

          const formattedData = data.docs.map((doc) => ({
            title: doc.title,
            // Open Library uses 'cover_i' for the image ID
            cover: doc.cover_i
              ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
              : "",
            id: doc.key,
          }));

          setCards(formattedData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="game-container">
      <Header
        title={"Books Memory Game"}
        desc={
          "Get points by clicking on a book but don't click on any more than once!"
        }
        score={0}
        bestScore={0}
      />

      {loading ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : (
        <Deck cards={cards} cardCount={10} />
      )}
    </div>
  );
}

export default App;
