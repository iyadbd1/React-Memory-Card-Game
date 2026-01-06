export default function Header({ title, desc, score, bestScore }) {
  return (
    <div className="header">
      <div className="header-left-section">
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="header-right-section">
        <p>Score: {score}</p>
        <p>Best score: {bestScore}</p>
      </div>
    </div>
  );
}
