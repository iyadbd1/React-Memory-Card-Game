export default function Card({ cardText, imageUrl }) {
  return (
    <div className="card">
      <img
        className="card-image"
        src={imageUrl}
        alt={`image of: ${cardText}`}
        height={286}
        width={180}
        loading="lazy"
      />
      <p className="card-text">{cardText}</p>
    </div>
  );
}
