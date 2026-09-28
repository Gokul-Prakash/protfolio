import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE } from '../../utils/animations';

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { label: string; to?: string; href?: string };
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

// "01 / Label" kicker · title + description · optional action link, on a 12-col grid
const SectionHeading = ({ index, label, title, description, action }: SectionHeadingProps) => (
  <motion.header
    className="section-heading"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, ease: EASE }}
  >
    <p className="section-heading__kicker">
      <span className="section-heading__index">{index}</span>
      <span>{label}</span>
    </p>

    <div className="section-heading__body">
      <h2 className="section-heading__title">{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>

    {action && (
      <div className="section-heading__action">
        {action.to ? (
          <Link to={action.to} className="text-link">
            {action.label} <Arrow />
          </Link>
        ) : (
          <a href={action.href} className="text-link">
            {action.label} <Arrow />
          </a>
        )}
      </div>
    )}
  </motion.header>
);

export default SectionHeading;
