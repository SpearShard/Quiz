export interface AnswerOption {
  text: string;
  rationale: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  answerOptions: AnswerOption[];
  hint: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  status: 'start' | 'playing' | 'finished';
  answersHistory: {
    questionId: string;
    isCorrect: boolean;
  }[];
}