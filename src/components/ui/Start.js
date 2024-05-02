import React, { useContext } from "react";
import useQuizStore from "ZustStore/quizStore";

const Start = () => {
  const { startQuiz, showStart } = useQuizStore();
  return (
    <section
      className="bg-dark text-center text-white"
      style={{ display: `${showStart ? "block" : "none"}` }}
    >
      <div className="container">
        <div className="flex h-screen items-center justify-center">
          <div className="lg:col-span-8">
            <h1 className="mb-4 font-bold">Start you Quiz</h1>
            <button
              onClick={startQuiz}
              className="btn bg-gray-200 px-4 py-2 font-bold text-gray-800"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
