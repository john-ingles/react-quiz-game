import React from "react";
import Answers from "./Answers";

export default function Question({ questionText, answers, questionId }) {
  return (
    <div className="question">
      <div className="question-title">{questionText}</div>

      <Answers answers={answers} questionId={questionId} />
      <hr />
    </div>
  );
}
