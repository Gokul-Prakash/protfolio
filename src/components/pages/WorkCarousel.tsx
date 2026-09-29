import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { EASE } from '../../utils/animations';
import { CAROUSEL_WORK, RecentProject } from '../../utils/content';

const DETAIL_FIELDS = [
  ['role', 'Role'],
  ['timeline', 'Timeline'],
  ['year', 'Year'],
  ['team', 'Team'],
] as const;

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

const expand = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.6, ease: EASE },
};

const Row = ({ project, active, onActivate }: { project: RecentProject; active: boolean; onActivate: () => void }) => {
  const details = DETAIL_FIELDS.filter(([key]) => project[key]);

  return (
    <li
      className={`work-list__row${active ? ' work-list__row--active' : ''}`}
      onMouseEnter={onActivate}
    >
      <div className="work-list__main">
        <div className="work-list__head">
          <h3 className="work-list__title">
            {/* Button so keyboard / touch users can open a row too */}
            <button type="button" className="work-list__toggle" aria-expanded={active} onClick={onActivate} onFocus={onActivate}>
              {project.label}
            </button>
          </h3>

          {project.href && (
            <a
              href={project.href}
              className="work-list__jump"
              tabIndex={active ? 0 : -1}
              // '#' is a placeholder link — keep the button but don't navigate
              {...(project.href === '#'
                ? { onClick: (e: React.MouseEvent) => e.preventDefault(), 'aria-disabled': true }
                : { target: '_blank', rel: 'noreferrer' })}
            >
              Jump to project <Arrow />
            </a>
          )}
        </div>

        <AnimatePresence initial={false}>
          {active && details.length > 0 && (
            <motion.dl key="details" className="work-list__details" {...expand}>
              {details.map(([key, label]) => (
                <div key={key} className="work-list__detail">
                  <dt>{label}</dt>
                  <dd>{project[key]}</dd>
                </div>
              ))}
            </motion.dl>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.figure key="media" className="work-list__media" {...expand}>
            <motion.img
              src={project.img}
              alt={project.label}
              draggable={false}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </motion.figure>
        )}
      </AnimatePresence>
    </li>
  );
};

// Hover accordion after pamidordesign.co's "Selected Projects": one row open at a
// time (title in accent, details + image revealed), the rest collapsed and muted.
const WorkCarousel = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="work-list" aria-label="Recent projects">
      <SectionHeading label="Recent work" title="Recent projects." />

      <ul className="work-list__rows">
        {CAROUSEL_WORK.map((project, i) => (
          <Row key={project.label} project={project} active={i === active} onActivate={() => setActive(i)} />
        ))}
      </ul>
    </section>
  );
};

export default WorkCarousel;
