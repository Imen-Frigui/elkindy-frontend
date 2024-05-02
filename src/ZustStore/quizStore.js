import { create } from "zustand";
import ChatService from "../services/marketplace/chat.service";
import { devtools, persist } from 'zustand/middleware'

const useQuizStore = create((set,get) => ({
  loading: false,
  questions: [],
  currentQuestion: 0,

  loadQuizData: async (token) => {
    set({ loading: true });
    try {
      const response = await ChatService.getQuizQuestions(token);
      const data = response.data.reply.quiz;
      console.log(data);
      set({ questions: data });
    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false });
    }
  },
  selectAnswer: (question, answer) => {
    const { questions } = get();
    const { currentQuestion } = get();
    const newQuestions = structuredClone(questions);
    const questionInfo = newQuestions[currentQuestion];
    const isCorrectUserAnswer = questionInfo.answer === answer;
    // if (isCorrectUserAnswer) confetti();

    newQuestions[currentQuestion] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answer,
    };

    set({ questions: newQuestions }, false, "SELECT_ANSWER");
  },
  goNextQuestion: () => {
    const { currentQuestion, questions } = get();
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion }, false, "GO_NEXT_QUESTION");
    }
  },
  goPreviousQuestion: () => {
    const { currentQuestion } = get();
    const previousQuestion = currentQuestion - 1;

    if (previousQuestion >= 0) {
      set({ currentQuestion: previousQuestion }, false, "GO_PREVIOSU_QUESTION");
    }
  },
  reset: () => {
    set({ currentQuestion: 0, questions: [] }, false, "RESET");
  },
}));

export default useQuizStore;
