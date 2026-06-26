import { useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface UseScrollAnimationProps {
  variants: Variants;
  threshold?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimation = ({
  variants,
  threshold = 0.1,
  triggerOnce = true,
}: UseScrollAnimationProps) => {
  const { ref, inView } = useInView({ threshold, triggerOnce });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  return { ref, controls, variants };
};
