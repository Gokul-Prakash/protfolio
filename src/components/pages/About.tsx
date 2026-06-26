import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../../utils/animations';
import FadeInOnScroll from '../animations/FadeInOnScroll';

const About = () => {
  return (
    <motion.div
      className="about"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="about__title" variants={itemVariants}>
        About Me
      </motion.h1>
      <div className="about__content">
        <FadeInOnScroll>
          <p>
            I'm a developer with a passion for building clean, accessible, and
            performant web applications. I enjoy working at the intersection of design
            and engineering.
          </p>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <p>
            My stack of choice includes React, TypeScript, and Framer Motion for
            bringing interfaces to life with smooth, purposeful animation.
          </p>
        </FadeInOnScroll>
      </div>
    </motion.div>
  );
};

export default About;
