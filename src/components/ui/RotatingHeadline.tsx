import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
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

type Direction = 1 | -1; // 1 = upward, -1 = downward

// Glyph anatomy in em, measured from the live font. `xTop` / `base` are offsets
// from the top of the initial's box to the x-height line and the baseline;
// `stem` is the right side of the stem from the letter's left edge.
type Metrics = { xTop: number; base: number; ascent: number; descent: number; stem: number };

const DURATION = 0.6;
const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const ASCENDERS = 'bdfhklt';

// Moving to a letter with an ascender (p → b) travels up; to one with a
// descender (b → p) travels down — so the direction follows the letterforms.
const directionTo = (word: string): Direction => (ASCENDERS.includes(word.charAt(0)) ? 1 : -1);

const slide = {
  enter: (dir: Direction) => ({ y: dir === 1 ? '145%' : '-145%' }),
  center: { y: '0%' },
  exit: (dir: Direction) => ({ y: dir === 1 ? '-145%' : '145%' }),
};

// Headline with a static lead ("I design for") and a final word that swaps with a
// masked vertical slide. One line on desktop; on mobile the word drops to its own
// line. Font-size is solved so the widest line spans the full width — so the size
// never jumps.
const RotatingHeadline = ({ lead, words, suffix, interval = 2800, className = '' }: RotatingHeadlineProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const initialRef = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState({ index: 0, prev: 0, id: 0 });
  const [settled, setSettled] = useState(0); // id of the last step whose initial finished moving
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [widths, setWidths] = useState<Record<string, number> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => ({ index: (s.index + 1) % words.length, prev: s.index, id: s.id + 1 }));
    }, interval);
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

    // Word widths (so the full stop can follow the word) and the initial's
    // anatomy — both in em, so they hold at any fitted font-size
    const measure = () => {
      const box = initialRef.current;
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (!box || !size) return;

      const next: Record<string, number> = {};
      el.querySelectorAll<HTMLElement>('[data-word-probe]').forEach((p) => {
        next[p.dataset.wordProbe!] = p.getBoundingClientRect().width / size;
      });
      setWidths(next);

      const marker = box.querySelector<HTMLElement>('[data-baseline]');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx || !marker) return;
      const cs = getComputedStyle(el);
      const px = 400;
      canvas.width = px * 2;
      canvas.height = px * 2;
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${px}px ${cs.fontFamily}`;
      const m = (c: string) => ctx.measureText(c);

      // Ink edges of a glyph along one row (y in em above the baseline) — finds
      // the stem's left/right side where only the stem crosses that row
      const ox = px / 2;
      const oy = px * 1.25;
      const stemAt = (c: string, y: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(c, ox, oy);
        const row = ctx.getImageData(0, Math.round(oy - y * px), canvas.width, 1).data;
        let left = -1;
        let right = -1;
        for (let x = 0; x < canvas.width; x++) {
          if (row[x * 4 + 3] > 127) {
            if (left < 0) left = x;
            right = x + 1;
          } else if (left >= 0) break;
        }
        return left < 0 ? null : (right - ox) / px;
      };

      const initials = Array.from(new Set(words.map((w) => w.charAt(0))));
      const xHeight = m('x').actualBoundingBoxAscent / px;
      const ascent = Math.max(...initials.map((c) => m(c).actualBoundingBoxAscent)) / px;
      const descent = Math.max(...initials.map((c) => m(c).actualBoundingBoxDescent)) / px;
      // Sample each stem halfway along its ascender / descender
      const edges = initials
        .map((c) => (ASCENDERS.includes(c) ? stemAt(c, (xHeight + ascent) / 2) : stemAt(c, -descent / 2)))
        .filter((e): e is number => e !== null);
      const baseline = (marker.getBoundingClientRect().top - box.getBoundingClientRect().top) / size;

      setMetrics({
        xTop: baseline - xHeight,
        base: baseline,
        ascent: ascent - xHeight,
        descent,
        // a hair past the stem's right side so its anti-aliased edge travels too
        stem: (edges.length ? Math.max(...edges) : 0.2) + 0.01,
      });
    };

    fit();
    measure();
    const ro = new ResizeObserver(() => {
      fit();
      measure();
    });
    ro.observe(el);
    document.fonts?.ready.then(() => {
      fit();
      measure();
    });
    return () => ro.disconnect();
  }, [lead, words]);

  const word = words[step.index];
  const from = words[step.prev].charAt(0);
  const to = word.charAt(0);
  const rest = word.slice(1);
  const dir = directionTo(word);

  const transition = reduceMotion ? { duration: 0 } : { duration: DURATION, ease: EASE };
  const layered = !!metrics && !reduceMotion && from !== to && settled !== step.id;

  // The initial is cut along its stem. The bowl (and the stem where it meets the
  // bowl) never moves; only the stem's ends slide vertically, each in its own
  // mask — the stem reads as one rod passing through a fixed bowl:
  //   p → b  rod rises: descender retracts, ascender extends
  //   b → p  rod sinks: ascender retracts, descender extends
  // The fixed part switches glyph at the midpoint (instant, not a fade).
  // No rotation — and at rest it's a single, unclipped letter.
  const stems = metrics && [
    { key: 'asc', travel: metrics.ascent },
    { key: 'desc', travel: metrics.descent },
  ];

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
        <motion.span
          className="rotating-headline__mask"
          initial={false}
          animate={{ width: widths?.[word] ? `${widths[word]}em` : 'auto' }}
          transition={transition}
        >
          <span
            ref={initialRef}
            className="rotating-headline__initial"
            style={
              metrics
                ? ({
                    '--rh-x-top': `${metrics.xTop}em`,
                    '--rh-base': `${metrics.base}em`,
                    '--rh-stem': `${metrics.stem}em`,
                    '--rh-half': `${DURATION / 2}s`,
                  } as CSSProperties)
                : undefined
            }
          >
            <span className="rotating-headline__initial-letter" style={{ visibility: layered ? 'hidden' : undefined }}>
              {to}
            </span>
            <span className="rotating-headline__baseline" data-baseline />

            {layered && (
              <span key={`fixed-${step.id}`} className="rotating-headline__band rotating-headline__band--fixed">
                <span className="rotating-headline__glyph rotating-headline__glyph--out">{from}</span>
                <span className="rotating-headline__glyph rotating-headline__glyph--in">{to}</span>
              </span>
            )}

            {layered &&
              stems!.map(({ key, travel }) => (
                <span key={`${key}-${step.id}`} className={`rotating-headline__band rotating-headline__band--${key}`}>
                  <motion.span
                    className="rotating-headline__glyph"
                    initial={{ y: '0em' }}
                    animate={{ y: `${-dir * travel}em` }}
                    transition={transition}
                  >
                    {from}
                  </motion.span>
                  <motion.span
                    className="rotating-headline__glyph"
                    initial={{ y: `${dir * travel}em` }}
                    animate={{ y: '0em' }}
                    transition={transition}
                    onAnimationComplete={key === 'asc' ? () => setSettled(step.id) : undefined}
                  >
                    {to}
                  </motion.span>
                </span>
              ))}
          </span>

          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.span
              key={word}
              className="rotating-headline__word"
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              {rest}
            </motion.span>
          </AnimatePresence>
        </motion.span>

        {/* Full stop sits outside the mask — it never slides, only follows the word's end */}
        {suffix && <span className="rotating-headline__suffix">{suffix}</span>}
      </span>

      {/* Invisible probes (every full line, and every word) used only for measuring */}
      <span className="rotating-headline__probes" aria-hidden="true">
        {words.map((w) => (
          <span key={w} data-fit-probe>
            <span className="rotating-headline__lead">
              {lead}
              <span className="rotating-headline__gap">&nbsp;</span>
            </span>
            {w}
            {suffix && <span className="rotating-headline__suffix">{suffix}</span>}
          </span>
        ))}
        {words.map((w) => (
          <span key={`word-${w}`} data-word-probe={w}>
            <span className="rotating-headline__initial">{w.charAt(0)}</span>
            <span className="rotating-headline__word">{w.slice(1)}</span>
          </span>
        ))}
      </span>
    </h1>
  );
};

export default RotatingHeadline;
