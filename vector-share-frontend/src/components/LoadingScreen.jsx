import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-app)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.15 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <motion.svg
            width="64"
            height="64"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 20 25 L 50 82 L 80 25"
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.svg>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="mt-5 font-display font-bold text-sm tracking-[0.2em] text-[var(--text-primary)] uppercase"
        >
          Vector<span className="text-[var(--accent)]">Share</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.12 }}
          className="mt-2 text-xs font-medium text-[var(--text-secondary)]"
        >
          Loading VectorShare...
        </motion.div>
      </div>
    </motion.div>
  );
}
