import React, { useContext } from "react";
import useQuizStore from "ZustStore/quizStore";
import { useQuestionsData } from "hooks/useQuestionData";

const Result = () => {
  const { correct, incorrect } = useQuestionsData();
  const reset = useQuizStore((state) => state.reset);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <h1 className="mb-6 text-center text-3xl font-bold">Your results</h1>
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <p className="mb-2 text-green-500">✔ {correct} correct answers</p>
        <p className="text-red-500">❌ {incorrect} incorrect answers</p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
          onClick={() => reset()}
        >
          Play again
        </button>
      </div>
    </div>
  );
};

export default Result;
