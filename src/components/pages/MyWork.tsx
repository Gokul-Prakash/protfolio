import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { fadeUp } from '../../utils/animations';
import { SELECTED_WORK } from '../../utils/content';

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

const MyWork = () => {
  return (
    <section className="selected-work" id="work">
      <SectionHeading
        label="Selected work"
        title="A glimpse of my work."
        description="A selection of projects focused on clarity, interaction, and building better experiences."
        action={{ label: "Start a project", to: '/contact' }}
      />

      <div className="selected-work__grid">
        {SELECTED_WORK.map((p, i) => (
          <motion.article
            key={p.id}
            className="work-card"
            variants={fadeUp((i % 2) * 0.1, 40)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="work-card__media">
              <img src={p.img} alt={p.title} loading="lazy" draggable={false} />
            </div>

            <div className="work-card__row">
              <div className="work-card__text">
                <h3 className="work-card__title">{p.title}</h3>
                <p className="work-card__tags">{p.tags.join(' / ')}</p>
              </div>
              <span className="work-card__action" aria-hidden="true">
                <Arrow />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default MyWork;
