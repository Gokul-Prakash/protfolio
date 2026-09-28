import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { EASE } from '../../utils/animations';

const Sun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
  </svg>
);

// Square toggle — sun in dark mode (switch to light), moon in light mode
const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="theme-toggle__icon"
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
