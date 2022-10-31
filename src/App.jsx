import "./App.css";
import React from "react";
import parse from "html-react-parser";
import Loading from "./components/Loading";
import QuestionList from "./components/QuestionList";
import Footer from "./components/Footer";
import StartScreen from "./components/StartScreen";

export const AnswersCheckedContext = React.createContext();
AnswersCheckedContext.displayName = "AnswersCheckedContext";
export const HandleSelectContext = React.createContext();
HandleSelectContext.displayName = "HandleSelectContext";

export default function App() {
  const firstUpdate = React.useRef(true);
  const [isStarted, setIsStarted] = React.useState(false);
  const [answersChecked, setAnswersChecked] = React.useState(false);
  const [resetGame, setResetGame] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]);

  React.useEffect(() => {
    async function getQuestionData() {
      /*
      Get 5 trivia questions from the Open Trivia Database (OTDB)
      */
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );

      const responseArray = await res.json();

      parseResponseArray(responseArray.results);
    }

    // ensure data isn't pulled on first page render (i.e. the start screen)
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    getQuestionData();
  }, [resetGame, isStarted]);

  function parseResponseArray(responseArray) {
    const parsedQuestionArray = responseArray.map((question) => {
      const questionText = parse(question.question);

      const incorrectAnswers = question.incorrect_answers.map((answer) => {
        return {
          answerText: parse(answer),
          isCorrect: false,
          isSelected: false,
        };
      });

      const correctAnswer = parse(question.correct_answer);

      let answers = [
        { answerText: correctAnswer, isCorrect: true, isSelected: false },
        ...incorrectAnswers,
      ];

      shuffleArray(answers);

      return {
        questionText: questionText,
        questionAnswers: answers,
      };
    });

    setQuestionsAndAnswers(parsedQuestionArray);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function toggleStartScreen() {
    setIsStarted((prevValue) => !prevValue);
  }

  function checkAnswers() {
    updateCorrectCount();
    setAnswersChecked((prevValue) => !prevValue);
  }

  function playAgain() {
    setQuestionsAndAnswers([]);
    setAnswersChecked((prevValue) => !prevValue);
    setResetGame((prevValue) => !prevValue);
  }

  function updateCorrectCount() {
    setCorrectCount(0);
    let winningCount = 0;

    questionsAndAnswers.forEach((question) => {
      question.questionAnswers.forEach((anwser) => {
        if (anwser.isCorrect && anwser.isSelected) {
          winningCount++;
        }
      });
    });

    setCorrectCount(winningCount);
  }

  function handleSelect(selectedAnswerIndex, selectedQuestIndex) {
    let newQuestionsAndAnswers = [...questionsAndAnswers];

    newQuestionsAndAnswers[selectedQuestIndex]["questionAnswers"].forEach(
      (answer, i) => {
        if (i === selectedAnswerIndex) {
          answer.isSelected = !answer.isSelected;
        } else {
          answer.isSelected = false;
        }
      }
    );

    setQuestionsAndAnswers(newQuestionsAndAnswers);
  }

  return (
    <main>
      {isStarted ? (
        questionsAndAnswers.length ? (
          <AnswersCheckedContext.Provider value={answersChecked}>
            <HandleSelectContext.Provider value={handleSelect}>
              <QuestionList questionsAndAnswers={questionsAndAnswers} />
            </HandleSelectContext.Provider>

            <Footer
              correctCount={correctCount}
              playAgain={playAgain}
              checkAnswers={checkAnswers}
            />
          </AnswersCheckedContext.Provider>
        ) : (
          <Loading />
        )
      ) : (
        <StartScreen toggleStartScreen={toggleStartScreen} />
      )}
    </main>
  );
}
