import Card from "./Card.jsx";

export default function Deck({ cards }) {
  return (
    <div className="card-container">
      <ul>
        {cards.map((card) => {
          <li key={card.id}>
            <Card cardText={card.cardTitle} imageUrl={card.cardImage} />
          </li>;
        })}
      </ul>
    </div>
  );
}
