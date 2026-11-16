import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <motion.svg
            width="72"
            height="72"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 20 25 L 50 82 L 80 25"
              stroke="#D7FF64"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.svg>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 font-display font-bold text-sm tracking-[0.25em] text-[#F5F3EB] uppercase"
        >
          Vector<span className="text-[#D7FF64]">Share</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-2 text-[10px] font-mono tracking-widest text-[#737373] uppercase"
        >
          [ 01 // ARCHITECTURAL VAULT ]
        </motion.div>
      </div>
    </motion.div>
  );
}
