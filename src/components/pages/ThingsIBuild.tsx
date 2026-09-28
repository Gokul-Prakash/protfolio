import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import { EASE, fadeUp, stagger } from '../../utils/animations';
import { FAN_IMAGES, SKILLS } from '../../utils/content';

// Rotation per card — fanned out from the centre
const ROTATIONS = [-22, -16, -11, -6, -2, 3, 8, 14];

const ICONS = [
  <svg key="ux" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
    <circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="18" r="2" />
    <path d="M6 8l6 8M18 8l-6 8" />
  </svg>,
  <svg key="ix" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
    <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6M9 3v18M3 15h18" />
  </svg>,
  <svg key="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
    <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>,
];

const ThingsIBuild = () => {
  return (
    <section className="tib">
      <SectionHeading
        index="02"
        label="Capabilities"
        title="Things I help build."
        description="Designing products, interactions, and experiences that people enjoy using."
      />

      {/* Stage — fanned stack of screens */}
      <div className="tib__stage">
        <span className="tib__stage-fig">Fig. A — Recent screens</span>
        {/* Reveal is triggered by the fan as a whole — the cards start below the
            stage's clipped edge, so they'd never register as "in view" themselves */}
        <motion.div
          className="tib__fan"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {FAN_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className="tib__fan-item"
              style={{
                zIndex: i + 1,
                // Spread cards evenly across the full width, edge to edge
                left: `calc((100% - var(--fan-item-w)) * ${i / (FAN_IMAGES.length - 1)})`,
              }}
              variants={{
                hidden: { opacity: 0, y: 80, rotate: ROTATIONS[i] - 6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotate: ROTATIONS[i],
                  transition: { duration: 0.8, ease: EASE, delay: i * 0.05 },
                },
              }}
              whileHover={{ y: -18, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <img src={img} alt="" draggable={false} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Atlas — numbered capability cells on a 1px grid */}
      <motion.div
        className="tib__atlas"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SKILLS.map((skill, i) => (
          <motion.article
            key={skill.title}
            className={`tib__cell${i === 1 ? ' tib__cell--accent' : ''}`}
            variants={fadeUp(0, 24)}
          >
            <div className="tib__cell-head">
              <span className="tib__cell-index">0{i + 1}</span>
              <span className="tib__cell-icon" aria-hidden="true">{ICONS[i]}</span>
            </div>
            <h3 className="tib__cell-title">{skill.title}</h3>
            <p className="tib__cell-blurb">{skill.blurb}</p>
            <ul className="tib__cell-readout">
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}

        <footer className="tib__rail">
          <span className="tib__rail-label">
            <span className="status-dot" aria-hidden="true" />
            Currently open to opportunities
          </span>
          <Link to="/contact" className="text-link">
            Start a conversation
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
            </svg>
          </Link>
        </footer>
      </motion.div>
    </section>
  );
};

export default ThingsIBuild;
