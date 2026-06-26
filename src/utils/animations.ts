import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const pageSlideVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

export const containerSlideVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const itemSlideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const itemSlideRightVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const itemScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const headerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  hover: {
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } },
};

export const heroSubtitleVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 } },
};

export const heroCTAVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.6 } },
};

export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2, ease: 'easeInOut' } },
  tap: { scale: 0.95 },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const easings = {
  standard: 'easeInOut',
  enter: 'easeOut',
  exit: 'easeIn',
  bounce: [0.68, -0.55, 0.265, 1.55],
};

export const durations = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1,
};

export const createStaggerAnimation = (
  item: Variants,
  staggerDelay = 0.1,
  totalDelay = 0
): { container: Variants; item: Variants } => ({
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: staggerDelay, delayChildren: totalDelay } },
  },
  item,
});

export const createScrollVariant = (offset = 50): Variants => ({
  offscreen: { y: offset, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } },
});
