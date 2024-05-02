import useQuizStore from "ZustStore/quizStore";
import Quiz from "./Quiz";
import { useQuestionsData } from "hooks/useQuestionData";
import Results from "./Result";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function QuizGame() {
  const { loadQuizData } = useQuizStore();
  const questions = useQuizStore((state) => state.questions);
  const { unanswered } = useQuestionsData();


  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      loadQuizData(token, "Music", "medium", "5");
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="content">
        <h1>Quiz Game</h1>
        {/* {questions.length === 0 && <PlayButton />} */}
        {questions.length > 0 && unanswered > 0 && <Quiz />}
        {questions.length > 0 && unanswered === 0 && <Results />}
      </div>
    </div>
  );
}

export default QuizGame;
