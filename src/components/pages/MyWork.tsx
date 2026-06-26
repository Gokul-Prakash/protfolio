import { motion } from 'framer-motion';
import { images } from '@assets/assets';

const PROJECTS = [
  {
    id: 1,
    title: 'Coca-Cola Foodmarks',
    tags: null,
    img: images.myWork.cocaCola,
    from: 'left' as const,
  },
  {
    id: 2,
    title: 'IPL Interactive Game',
    tags: null,
    img: images.myWork.ipl,
    from: 'right' as const,
  },
  {
    id: 3,
    title: 'Classmate Digital Catalogue',
    tags: 'design, branding,',
    img: images.myWork.classmate,
    from: 'left' as const,
  },
  {
    id: 4,
    title: 'NextEd',
    tags: null,
    img: images.myWork.nextEd,
    from: 'right' as const,
  },
];

const cardVariant = (from: 'left' | 'right') => ({
  hidden: { opacity: 0, x: from === 'left' ? -80 : 80, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
});

const MyWork = () => {
  return (
    <section className="things">
      {/* Intro */}
      <motion.div
        className="things__intro"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="things__title">A glimpse of my work</h2>
        <p className="things__subtitle">
          A selection of projects focused on clarity, interaction,
          <br />
          and building better experiences
        </p>
      </motion.div>

      {/* Grid */}
      <div className="things__grid">
        {PROJECTS.map((p) => (
          <motion.div
            key={p.id}
            className="things__card"
            variants={cardVariant(p.from)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Single image */}
            <motion.div
              className="things__image-wrap"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <img
                src={p.img}
                alt={p.title}
                draggable={false}
              />
            </motion.div>

            {/* Info */}
            <div className="things__info">
              <h3 className="things__name">{p.title}</h3>
              {p.tags && <span className="things__tags">{p.tags}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MyWork;
