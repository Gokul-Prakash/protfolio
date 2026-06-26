import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { containerVariants, itemVariants } from '../../utils/animations';

const NotFound = () => {
  return (
    <motion.div
      style={{ textAlign: 'center', padding: '6rem 2rem' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 style={{ fontSize: '6rem', fontWeight: 700 }} variants={itemVariants}>
        404
      </motion.h1>
      <motion.p style={{ marginBottom: '2rem' }} variants={itemVariants}>
        Page not found.
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link to="/" className="btn btn--primary">
          Back Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
