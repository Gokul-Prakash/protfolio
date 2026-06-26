import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useAnimation';
import { itemVariants } from '../../utils/animations';

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

const FadeInOnScroll = ({ children, className, threshold }: FadeInOnScrollProps) => {
  const { ref, controls, variants } = useScrollAnimation({ variants: itemVariants, threshold });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
