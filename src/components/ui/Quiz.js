import React, { useEffect, useState } from "react";
import useQuizStore from "ZustStore/quizStore";
import LoadingSpinner from "./LoadingSpinner";

const Quiz = () => {
  const { loadQuizData } = useQuizStore();
  const questions = useQuizStore((state) => state.questions);
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const goNextQuestion = useQuizStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuizStore((state) => state.goPreviousQuestion);
  const questionInfo = questions[currentQuestion];
  const loading = useQuizStore((state) => state.loading);
  const selectAnswer = useQuizStore((state) => state.selectAnswer);
  const [timer, setTimer] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);

  const getBackGroundColor = (info, answer) => {
    const { userSelectedAnswer, correctAnswer } = info;
    if (userSelectedAnswer == null) return "";
    if (answer !== correctAnswer && answer !== userSelectedAnswer) return "";
    if (answer === correctAnswer) return "bg-green-200";
    if (answer === userSelectedAnswer) return "bg-red-200";
    return "bg-black";
  };

  const createHandleClick = (answer) => {
    selectAnswer(questionInfo, answer);
    // resetTimer();
  };

  // useEffect(() => {
  //   setTimer(15);
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       if (prevTimer === 0) {
  //         clearInterval(interval);
  //         goNextQuestion();
  //       }
  //       return prevTimer - 1;
  //     });
  //   }, 1000);

  //   setTimerInterval(interval);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentQuestion]);
  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimer(15);
  };
  return (
    <div className="mt-10">
      <div className="vh-screen flex items-center justify-center">
        <div className="w-1/2">
          <div className="card border border-gray-600 bg-kindydarkblue p-4">
            <div className="flex justify-between gap-x-3">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex">
                  <h5 className="mb-2 text-white">{questionInfo?.question}</h5>
                  <h5 className="w-24 justify-end text-right text-green-500">
                    {currentQuestion + 1} / {questions.length}
                  </h5>
                  <div className="mt-3 flex justify-center text-white">
                    <p>{timer} seconds remaining</p>
                  </div>
                </div>
              )}
            </div>
            <div>
              {questionInfo.choices.map((item, index) => (
                <button
                  key={index}
                  className={`mt-3 w-full rounded bg-gray-500 px-3 py-2  text-white ${getBackGroundColor(
                    questionInfo,
                    item
                  )}`}
                  onClick={(event) => {
                    questionInfo.userSelectedAnswer == null &&
                      createHandleClick(item);
                  }}
                >
                  <span>{item}</span>
                </button>
              ))}
            </div>
            <button
              className=" mt-3 w-full bg-kindyorange py-2 font-bold text-white"
              onClick={goNextQuestion}
              disabled={currentQuestion >= questions.length - 1}
            >
              Next Question
            </button>
            {/* {questionIndex + 1 !== quizs.length ? (
                  <button
                    className=" mt-3 w-full bg-kindyorange py-2 font-bold text-white"
                    onClick={next}
                    // disabled={!selectedAnswer}
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    className="btn mt-3 w-full bg-blue-500 py-2 font-bold text-white"
                    onClick={showTheResult}
                    disabled={!selectedAnswer}
                  >
                    Show Result
                  </button>
                )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
