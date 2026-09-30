import { lazy, Suspense, useEffect, useRef } from 'react';
import { AnimatePresence, motion, PanInfo, useDragControls } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { EASE } from '../../utils/animations';
import { CaseStudy } from '../../content/caseStudies';

const CaseStudyContent = lazy(() => import('./CaseStudyContent'));

type CaseStudySheetProps = {
  study: CaseStudy | null;
  onClose: () => void;
};

// Drag the handle down past this (px) or flick faster than this (px/s) to close
const CLOSE_OFFSET = 140;
const CLOSE_VELOCITY = 600;

// Bottom sheet that slides a case study up over the page.
// Closes on: handle drag down, Escape, backdrop click, close button.
const CaseStudySheet = ({ study, onClose }: CaseStudySheetProps) => {
  const dragControls = useDragControls();
  const lenis = useLenis();
  const sheetRef = useRef<HTMLDivElement>(null);
  const open = Boolean(study);

  // While open: pause page scroll (Lenis ignores overflow:hidden), Escape closes,
  // focus moves into the sheet and returns to the card afterwards.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();

    lenis?.stop();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    requestAnimationFrame(() => sheetRef.current?.focus());

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, lenis, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > CLOSE_OFFSET || info.velocity.y > CLOSE_VELOCITY) onClose();
  };

  return (
    <AnimatePresence>
      {study && (
        <>
          <motion.div
            className="sheet__backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />

          <motion.div
            ref={sheetRef}
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            tabIndex={-1}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: EASE }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={onDragEnd}
          >
            {/* Grab bar — the only drag target, so scrolling the content never drags the sheet */}
            <div className="sheet__bar" onPointerDown={(e) => dragControls.start(e)}>
              <span className="sheet__handle" aria-hidden="true" />
              <button type="button" className="sheet__close" onClick={onClose} aria-label="Close case study">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </button>
            </div>

            <div className="sheet__scroll" data-lenis-prevent>
              <Suspense fallback={<div className="sheet__loading" aria-busy="true" />}>
                <CaseStudyContent study={study} onClose={onClose} />
              </Suspense>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CaseStudySheet;
