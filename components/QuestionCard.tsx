import React, { useState, useEffect } from 'react';
import { Question, AnswerOption } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight, Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<AnswerOption | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsRevealed(false);
    setShowHint(false);
  }, [question.id]);

  const handleSelect = (option: AnswerOption) => {
    if (isRevealed) return;
    
    setSelectedOption(option);
    setIsRevealed(true);
  };

  const handleNext = () => {
    if (selectedOption) {
      onAnswer(selectedOption.isCorrect);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative z-10">
        
        {/* Question Header */}
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-white mb-10 leading-[1.2] font-space"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={question.id}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {question.question}
        </motion.h2>

        {/* Hint Toggle */}
        <div className="mb-8 flex justify-end">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest"
          >
            <Lightbulb size={16} />
            {showHint ? 'Hide Hint' : 'Need a Hint?'}
          </button>
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-indigo-900/20 border-l-2 border-indigo-500 p-4 text-indigo-200 text-sm">
                {question.hint}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answers Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {question.answerOptions.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option.isCorrect;
            
            // Determine styles based on state
            let borderColor = 'border-slate-800';
            let bgColor = 'bg-slate-900/40';
            let textColor = 'text-slate-300';
            
            if (isRevealed) {
              if (isSelected) {
                if (isCorrect) {
                  borderColor = 'border-emerald-500';
                  bgColor = 'bg-emerald-950/30';
                  textColor = 'text-emerald-50';
                } else {
                  borderColor = 'border-rose-500';
                  bgColor = 'bg-rose-950/30';
                  textColor = 'text-rose-50';
                }
              } else if (isCorrect) {
                 // Show correct answer even if not selected
                 borderColor = 'border-emerald-500/50';
                 bgColor = 'bg-emerald-950/10';
                 textColor = 'text-emerald-200/70';
              } else {
                 // Dim other incorrect answers
                 borderColor = 'border-slate-900';
                 bgColor = 'bg-black/20';
                 textColor = 'text-slate-600';
              }
            } else {
               // Default hover state
               if (isSelected) { // While clicking before reveal logic (immediate feedback if needed)
                  borderColor = 'border-white';
               }
            }

            return (
              <motion.button
                key={idx}
                disabled={isRevealed}
                onClick={() => handleSelect(option)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative w-full text-left p-6 md:p-8 rounded-2xl border ${borderColor} ${bgColor} transition-all duration-500 outline-none`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className={`text-lg md:text-xl font-medium ${textColor} transition-colors duration-300`}>
                      {option.text}
                    </span>
                    
                    {/* Rationale Reveal */}
                    <AnimatePresence>
                      {isRevealed && (isSelected || (isCorrect && !selectedOption?.isCorrect)) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                          className="overflow-hidden"
                        >
                          <p className={`text-sm leading-relaxed ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                            <span className="font-bold uppercase tracking-wider text-xs block mb-1">Rationale</span>
                            {option.rationale}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Icon Status */}
                  {isRevealed && isSelected && (
                    <div className="shrink-0 mt-1">
                       {isCorrect ? <Check className="text-emerald-500" /> : <X className="text-rose-500" />}
                    </div>
                  )}
                  {!isRevealed && (
                    <div className="shrink-0 w-6 h-6 rounded-full border border-slate-700 group-hover:border-white transition-colors mt-1 opacity-50 group-hover:opacity-100" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              className="flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={handleNext}
                className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-indigo-50 transition-colors"
              >
                Continue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuestionCard;