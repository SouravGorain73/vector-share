import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AnimatedText({ text, className = "", onClick, type = "button" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`group relative overflow-hidden inline-flex items-center gap-2 ${className}`}
      whileHover="hover"
    >
      <span className="relative z-10 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute z-10 inset-0 flex items-center translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0">
        {text}
        <ArrowRight size={16} className="ml-2 -translate-x-4 opacity-0 transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-0 group-hover:opacity-100" />
      </span>
    </motion.button>
  );
}
