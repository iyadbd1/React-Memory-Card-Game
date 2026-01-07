import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Deck from "./components/Deck.jsx";

function App() {
  /* App State */
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clickedCardsIds, setClickedCardsIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const deckSize = 20;

  /* Fetching and saving data from Open Library API */
  useEffect(() => {
    const popularISBNs = [
      // --- FANTASY (Harry Potter, LOTR, Percy Jackson) ---
      "0439064872",
      "0439136369",
      "0439139600",
      "0439358078",
      "0439763672",
      "0545010225",
      "0439064864",
      "0618640150",
      "0261102354",
      "0261102362",
      "0261102370",
      "0618260307",
      "0345339703",
      "0345339711",
      "0345339738",
      "0786856297",
      "0786838655",
      "0439023483",
      "0007110068",
      "054504443X",

      // --- SCI-FI & DYSTOPIAN (Hunger Games, Maze Runner, Dune) ---
      "0439023521",
      "0439023491",
      "0439023513",
      "0385737947",
      "0385737955",
      "0385738757",
      "0385738765",
      "1416914285",
      "0441172717",
      "0765342154",
      "0345391802",
      "006440490X",
      "0064405027",
      "0451457994",
      "0553283683",
      "0441013597",
      "0312853238",
      "0765321335",
      "0060512803",
      "0765351307",

      // --- SEA ADVENTURE & MARITIME ---
      "0140430075",
      "0553212743",
      "0140620826",
      "0451523415",
      "0140430024",
      "0140430334",
      "0140430032",
      "0486406334",
      "0553213111",
      "0140431187",
      "0140430571",
      "0140432175",
      "0393011364",
      "0393012131",
      "0393012263",

      // --- MYSTERY & CLASSIC ADVENTURE ---
      "0140430040",
      "1503251330",
      "0140434739",
      "0486411109",
      "0140624260",
      "0140280375",
      "0553212107",
      "0451523318",
      "0486415511",
      "0140350179",
      "0140390146",
      "0486411087",
      "045152473X",
      "0140449116",
      "0140177396",
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

          const formattedData = data.docs
            .filter((doc) => doc.ebook_access !== "no_ebook")
            .map((doc) => ({
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

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
  }

  function handleCardClick(cardId) {
    // shuffle cards
    setCards(shuffle(cards));

    // if card is not clicked
    if (!clickedCardsIds.includes(cardId)) {
      // increment score
      setScore(score + 1);

      // the card is now clicked, memorize that
      setClickedCardsIds([...clickedCardsIds, cardId]);
    } else {
      // a clicked card has been clicked again, so the player loses!
      // save best score and reset score
      setBestScore(score);
      setScore(0);
      // empty the clicked cards array
      setClickedCardsIds([]);
    }
  }

  return (
    <div className="game-container">
      <Header
        title={"Books Memory Game"}
        desc={
          "Get points by clicking on a book but don't click on any more than once!"
        }
        score={score}
        bestScore={bestScore}
      />

      {loading ? (
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginTop: "5em" }}>
          Loading...
        </h2>
      ) : (
        <Deck
          cardList={cards}
          onCardClick={handleCardClick}
          deckSize={deckSize}
        />
      )}
    </div>
  );
}

export default App;
