import React from 'react';
import { QuizState } from '../types';
import Button from './Button';
import { motion } from 'framer-motion';
import { RefreshCcw, Share2, Award } from 'lucide-react';

interface ResultsScreenProps {
  quizState: QuizState;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  quizState,
  totalQuestions,
  onRestart,
}) => {
  const percentage = Math.round((quizState.score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage >= 90) return { title: "Quality Master", sub: "Exceptional understanding." };
    if (percentage >= 70) return { title: "Proficient", sub: "Solid grasp of concepts." };
    return { title: "Apprentice", sub: "Keep learning and improving." };
  };

  const message = getMessage();

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto px-6 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "backOut" }}
    >
      <div className="mb-12 relative inline-block">
        <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
           <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1e293b"
              strokeWidth="4"
           />
           <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset="283"
              animate={{ strokeDashoffset: 283 - (283 * percentage) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
           />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold font-space">{percentage}%</span>
        </div>
      </div>

      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.8 }}
      >
        <h2 className="text-5xl font-bold font-space mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
            {message.title}
        </h2>
        <p className="text-slate-400 text-xl mb-12">{message.sub}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-12 max-w-md mx-auto">
             <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                <div className="text-slate-500 text-sm uppercase tracking-wider mb-1">Score</div>
                <div className="text-3xl font-medium text-white">{quizState.score} / {totalQuestions}</div>
             </div>
             <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                <div className="text-slate-500 text-sm uppercase tracking-wider mb-1">Mistakes</div>
                <div className="text-3xl font-medium text-rose-400">{totalQuestions - quizState.score}</div>
             </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRestart} variant="primary" className="flex items-center justify-center gap-2">
            <RefreshCcw size={18} />
            Restart Quiz
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2">
             <Share2 size={18} />
             Share Result
          </Button>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default ResultsScreen;