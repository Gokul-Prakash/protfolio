import { motion } from 'framer-motion';
import StripeButton from '../ui/StripeButton';
import { fadeUp, stagger } from '../../utils/animations';

const NotFound = () => {
  return (
    <motion.main
      className="not-found"
      variants={stagger(0.08)}
      initial="hidden"
      animate="visible"
    >
      <motion.p className="not-found__kicker" variants={fadeUp()}>
        Error / Page not found
      </motion.p>
      <motion.h1 className="not-found__code" variants={fadeUp(0, 48)}>
        404
      </motion.h1>
      <motion.p className="not-found__text" variants={fadeUp()}>
        This page wandered off. Let's get you back on track.
      </motion.p>
      <motion.div variants={fadeUp()}>
        <StripeButton to="/" variant="primary">
          Back home
        </StripeButton>
      </motion.div>
    </motion.main>
  );
};

export default NotFound;
