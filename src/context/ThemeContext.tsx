import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { flushSync } from 'react-dom';
import type { Theme } from '../types';

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { dark: '#0f1311', light: '#f7f7f4' };

interface ThemeContextValue {
  theme: Theme;
  /** Pass the click origin to play the circular reveal from that point */
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Saved choice → system preference → dark. index.html applies the same
// logic before first paint, so there's no flash of the wrong theme.
const getInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage blocked — fall through */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'light' ? 'dark' : 'light';
      const commit = () => {
        flushSync(() => setTheme(next));
        applyTheme(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
      };

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduceMotion) {
        commit();
        return;
      }

      // Circular wipe from the toggle, via the View Transitions API
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      document.startViewTransition(commit).ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      });
    },
    [theme]
  );

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
