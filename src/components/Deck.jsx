import Card from "./Card.jsx";

export default function Deck({ cards, cardCount }) {
  cardCount = cardCount === undefined && cards.length;

  return (
    <ul className="card-container">
      {cards.map(
        (card, index) =>
          card.cover !== "" &&
          index < cardCount && (
            <li key={card.id}>
              <Card title={card.title} imageUrl={card.cover} />
            </li>
          )
      )}
    </ul>
  );
}
