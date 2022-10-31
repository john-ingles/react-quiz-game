import React from "react";
import { AnswersCheckedContext, HandleSelectContext } from "../App";

export default function Answers({ answers, questionId }) {
  const onResultsScreen = React.useContext(AnswersCheckedContext);
  const handleSelect = React.useContext(HandleSelectContext);

  const answersList = answers.map((answer, answerIndex) =>
    onResultsScreen ? (
      <div
        className={
          answer.isSelected
            ? answer.isCorrect
              ? "answerResult selectedResult correct"
              : "answerResult selectedResult incorrect"
            : answer.isCorrect
            ? "answerResult correct"
            : "answerResult"
        }
        key={answerIndex}
      >
        <div className="answer-text">{answer.answerText}</div>
      </div>
    ) : (
      <div
        className={answer.isSelected ? "answer selected" : "answer"}
        key={answerIndex}
        onClick={() => handleSelect(answerIndex, questionId)}
      >
        <div className="answer-text">{answer.answerText}</div>
      </div>
    )
  );
  return <div className="answers-container">{answersList}</div>;
}
