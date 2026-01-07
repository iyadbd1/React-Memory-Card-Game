import Card from "./Card.jsx";

export default function Deck({ cardList, deckSize, onCardClick }) {
  if (deckSize === undefined) deckSize = cardList.length;

  return (
    <ul className="card-container">
      {cardList.map(
        (card, index) =>
          card.cover !== "" &&
          index < deckSize && (
            <li key={card.id} onClick={() => onCardClick(card.id)}>
              <Card
                key={card.id}
                title={card.title}
                imageUrl={card.cover}
                onClick={onCardClick}
              />
            </li>
          )
      )}
    </ul>
  );
}
