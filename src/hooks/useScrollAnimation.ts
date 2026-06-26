import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { createScrollVariant } from '../utils/animations';

export const useScrollAnimation = (offset = 50) => {
  const variants = createScrollVariant(offset);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('onscreen');
  }, [controls, inView]);

  return { ref, controls, variants };
};
