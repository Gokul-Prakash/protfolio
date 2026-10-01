import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type RotatingHeadlineProps = {
  /** Static start of the line, e.g. "I design for" */
  lead: string;
  /** Words that rotate at the end of the line */
  words: string[];
  /** Trailing mark after each word (e.g. "."), set smaller than the headline */
  suffix?: string;
  /** How long each word stays, in ms */
  interval?: number;
  className?: string;
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Headline with a static lead ("I design for") and a final word that swaps with a
// masked vertical slide. One line on desktop; on mobile the word drops to its own
// line. Font-size is solved so the widest line spans the full width — so the size
// never jumps.
const RotatingHeadline = ({ lead, words, suffix, interval = 2800, className = '' }: RotatingHeadlineProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Fit to width, measured against hidden copies of every candidate line
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const available = el.clientWidth;
      const probes = el.querySelectorAll<HTMLElement>('[data-fit-probe]');
      const widest = Math.max(...Array.from(probes, (p) => p.getBoundingClientRect().width));
      if (!available || !widest) return;

      const current = parseFloat(getComputedStyle(el).fontSize);
      // 0.998 keeps sub-pixel rounding from overshooting the edge
      const next = ((current * available) / widest) * 0.998;
      // Threshold stops the ResizeObserver (height changes) from looping
      if (Math.abs(next - current) > 0.25) el.style.fontSize = `${next}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [lead, words]);

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : {
        // Travel past the clip's extra ascender/descender room so words fully hide
        initial: { y: '145%' },
        animate: { y: '0%' },
        exit: { y: '-145%' },
        transition: { duration: 0.55, ease: EASE_OUT },
      };

  // First letter flips on its own when it changes (p → b is a vertical flip of the
  // same glyph); when it stays the same (p → p) it doesn't move at all.
  const word = words[index];
  const initial = word.charAt(0);
  const rest = word.slice(1);

  const flip = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { rotateX: -90 },
        animate: { rotateX: 0 },
        exit: { rotateX: 90 },
        transition: { duration: 0.16, ease: 'easeInOut' },
      };

  return (
    <h1
      ref={ref}
      className={`rotating-headline ${className}`.trim()}
      aria-label={`${lead} ${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`}
    >
      <span className="rotating-headline__line" aria-hidden="true">
        <span className="rotating-headline__lead">
          {lead}
          <span className="rotating-headline__gap">&nbsp;</span>
        </span>

        {/* Masked word — only this moves */}
        <span className="rotating-headline__mask">
          <span className="rotating-headline__initial">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={initial} className="rotating-headline__initial-letter" {...flip}>
                {initial}
              </motion.span>
            </AnimatePresence>
          </span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={word} className="rotating-headline__word" {...slide}>
              {rest}
              {suffix && <span className="rotating-headline__suffix">{suffix}</span>}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>

      {/* Invisible probes (every full line) used only for measuring */}
      <span className="rotating-headline__probes" aria-hidden="true">
        {words.map((word) => (
          <span key={word} data-fit-probe>
            <span className="rotating-headline__lead">
              {lead}
              <span className="rotating-headline__gap">&nbsp;</span>
            </span>
            {word}
            {suffix && <span className="rotating-headline__suffix">{suffix}</span>}
          </span>
        ))}
      </span>
    </h1>
  );
};

export default RotatingHeadline;
