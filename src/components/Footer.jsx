import React from "react";
import ConfettiResizable from "./ConfettiResizable";
import { AnswersCheckedContext } from "../App";

export default function Footer({ correctCount, playAgain, checkAnswers }) {
  const answersChecked = React.useContext(AnswersCheckedContext);
  return (
    <div className="footer">
      <div className="check-and-restart-container">
        {answersChecked ? (
          <>
            <div className="score-text">
              {correctCount === 5 && <ConfettiResizable />}
              You scored {correctCount}/5 correct answers
              {correctCount === 5 ? ` 🎉` : ` 😖`}
            </div>
            <div className="check-and-restart-button" onClick={playAgain}>
              Play Again?
            </div>
          </>
        ) : (
          <div className="check-and-restart-button" onClick={checkAnswers}>
            Check Answers
          </div>
        )}
      </div>
    </div>
  );
}
