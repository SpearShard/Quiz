import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 px-4 md:px-0">
      <div className="flex justify-between items-end mb-3">
        <span className="text-xs font-medium text-slate-400 tracking-[0.2em] uppercase">
          Progression
        </span>
        <span className="text-3xl font-light text-white font-space">
          {String(current + 1).padStart(2, '0')}
          <span className="text-base text-slate-600 ml-1">/ {total}</span>
        </span>
      </div>
      <div className="h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "circOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;