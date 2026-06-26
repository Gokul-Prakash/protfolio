import { motion } from 'framer-motion';
import { containerVariants, itemVariants, cardVariants } from '../../utils/animations';
import { PROJECTS } from '../../utils/constants';

const Projects = () => {
  return (
    <motion.div
      className="projects"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="projects__title" variants={itemVariants}>
        Projects
      </motion.h1>
      <div className="projects__grid">
        {PROJECTS.map(project => (
          <motion.div
            key={project.id}
            className="projects__card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h2 className="projects__card-title">{project.title}</h2>
            <p className="projects__card-description">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
