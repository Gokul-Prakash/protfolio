import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { itemSlideLeftVariants, itemSlideRightVariants } from '../../utils/animations';

interface SlideInAnimationProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  className?: string;
}

const SlideInAnimation = ({ children, direction = 'left', className }: SlideInAnimationProps) => {
  const variants = direction === 'left' ? itemSlideLeftVariants : itemSlideRightVariants;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideInAnimation;
