export default function StartScreen({ toggleStartScreen }) {
  return (
    <div className="not-started">
      <div className="game-title">Quizzical</div>
      <div className="game-desc">
        Can you answer these 5 general trivia questions?
      </div>
      <div className="start-button" onClick={toggleStartScreen}>
        <div className="start-button-text">Start quiz</div>
      </div>
    </div>
  );
}
