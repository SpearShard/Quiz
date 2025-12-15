import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden px-8 py-4 rounded-xl font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white text-black hover:bg-slate-200",
    secondary: "bg-slate-800 text-white hover:bg-slate-700",
    outline: "bg-transparent text-white border border-slate-700 hover:border-white/50 hover:bg-white/5",
    ghost: "bg-transparent text-slate-400 hover:text-white"
  };

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props as any}
    >
      {children}
    </motion.button>
  );
};

export default Button;