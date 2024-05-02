import  useQuizStore from 'ZustStore/quizStore'

export const useQuestionsData = () => {
  const questions = useQuizStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })
  return { correct, incorrect, unanswered }
}