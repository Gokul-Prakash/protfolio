import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type FitTextProps = {
  lines: string[];
  /** Line split used below `mobileQuery` (e.g. one word per line on phones) */
  mobileLines?: string[];
  mobileQuery?: string;
  className?: string;
};

// Heading whose font-size is solved so its widest line spans exactly the
// available width. Works with any font; re-fits on resize and once webfonts load.
const FitText = ({
  lines,
  mobileLines,
  mobileQuery = '(max-width: 479px)',
  className = '',
}: FitTextProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(mobileQuery).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(mobileQuery);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mobileQuery]);

  const shown = isMobile && mobileLines ? mobileLines : lines;
  const key = shown.join('\n');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const available = el.clientWidth;
      const spans = el.querySelectorAll<HTMLElement>('[data-fit-line]');
      const widest = Math.max(...Array.from(spans, (s) => s.getBoundingClientRect().width));
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
  }, [key]);

  return (
    <h1 ref={ref} className={`fit-text ${className}`.trim()} aria-label={lines.join(' ')}>
      {shown.map((line) => (
        <span key={line} data-fit-line aria-hidden="true" className="fit-text__line">
          {line}
        </span>
      ))}
    </h1>
  );
};

export default FitText;
