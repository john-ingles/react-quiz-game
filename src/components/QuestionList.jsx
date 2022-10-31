import React from "react";
import Question from "./Question";

export default function QuestionList({ questionsAndAnswers }) {
  return questionsAndAnswers.map((questionAndAnswer, index) => (
    <Question
      key={index}
      questionId={index}
      questionText={questionAndAnswer.questionText}
      answers={questionAndAnswer.questionAnswers}
    />
  ));
}
