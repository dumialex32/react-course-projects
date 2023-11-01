export function Input() {
  return (
    <div className="input-container">
      <input type="range" min="0" max="15"></input>
      <p className="question-num">Question x / 15</p>
      <p className="points">x / 280 points</p>
    </div>
  );
}
