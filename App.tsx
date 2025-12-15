import React, { useState } from 'react';
import { loadQuizData } from './services/dataService';
import { QuizState, Question } from './types';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsScreen from './components/ResultsScreen';
import Button from './components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  // Load initial data - using state so we can refresh/reshuffle it later
  const [questions, setQuestions] = useState<Question[]>(() => loadQuizData());

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    status: 'start',
    answersHistory: [],
  });

  const handleStart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      status: 'playing',
      answersHistory: [],
    });
  };

  const handleAnswer = (isCorrect: boolean) => {
    setQuizState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isFinished = nextIndex >= questions.length;

      return {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        currentQuestionIndex: isFinished ? prev.currentQuestionIndex : nextIndex,
        status: isFinished ? 'finished' : 'playing',
        answersHistory: [
            ...prev.answersHistory,
            { questionId: questions[prev.currentQuestionIndex].id, isCorrect }
        ]
      };
    });
  };

  const handleRestart = () => {
     // Generate new shuffled questions
     setQuestions(loadQuizData());
     
     // Reset state to start screen
     setQuizState({
       currentQuestionIndex: 0,
       score: 0,
       status: 'start',
       answersHistory: [],
     });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white font-sans selection:bg-indigo-500/30">
      
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-fuchsia-900/10 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        
        <AnimatePresence mode="wait">
          {quizState.status === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-2xl"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8 text-indigo-400 font-bold tracking-[0.2em] uppercase text-sm"
              >
                Interactive Assessment
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-bold font-space mb-8 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                Software Quality Master
              </h1>
              
              <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
                Test your expertise in software quality assurance, fault analysis, and development methodologies.
              </p>

              <Button onClick={handleStart} className="text-lg px-12 py-5 bg-white text-black hover:bg-slate-200">
                Begin Assessment
              </Button>
            </motion.div>
          )}

          {quizState.status === 'playing' && (
            <motion.div 
              key="playing"
              className="w-full max-w-5xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressBar 
                  current={quizState.currentQuestionIndex} 
                  total={questions.length} 
              />
              <QuestionCard
                question={questions[quizState.currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}

          {quizState.status === 'finished' && (
            <motion.div
               key="finished"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
            >
              <ResultsScreen
                quizState={quizState}
                totalQuestions={questions.length}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      
      {/* Branding / Footer */}
      <footer className="fixed bottom-6 left-6 text-xs text-slate-600 tracking-wider font-medium z-10 hidden md:block">
        SQA MODULE • 2024
      </footer>
    </div>
  );
};

export default App;