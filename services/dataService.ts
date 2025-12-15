import { Question } from '../types';
import { QUIZ_DATA } from '../constants';

export const loadQuizData = (): Question[] => {
  const questions: Question[] = QUIZ_DATA.quiz.map((q, index) => ({
    id: `q-${index}`,
    question: q.question,
    hint: q.hint,
    answerOptions: shuffleArray([...q.answerOptions])
  }));

  // Shuffle questions
  return shuffleArray(questions);
};

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}