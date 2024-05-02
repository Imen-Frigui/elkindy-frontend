import useQuizStore from "ZustStore/quizStore";
import Quiz from "./Quiz";
import { useQuestionsData } from "hooks/useQuestionData";
import Results from "./Result";
import React, { useEffect } from "react";
function QuizGame() {
  const { loadQuizData } = useQuizStore();
  const questions = useQuizStore((state) => state.questions);
  const { unanswered } = useQuestionsData();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      loadQuizData(token);
    };
    fetchData();
  }, []);

  return (
    <div>
      
      <div className="content">
        {/* {questions.length === 0 && <PlayButton />} */}
        {questions.length > 0 && unanswered > 0 && <Quiz />}
        {questions.length > 0 && unanswered === 0 && <Results />}
      </div>
    </div>
  );
}

export default QuizGame;
