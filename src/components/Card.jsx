export default function Card({ title, imageUrl }) {
  return (
    <div className="card">
      <img
        className="card-image"
        src={imageUrl}
        alt={`image of: ${title}`}
        height={286}
        width={180}
        // loading="lazy"
      />
      <p className="card-text">{title}</p>
    </div>
  );
}
