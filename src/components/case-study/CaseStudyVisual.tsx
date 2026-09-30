import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../utils/animations';
import type { CaseStudyVisual as Visual, VisualImage } from '../../content/caseStudies';
import OctechSystem from './OctechSystem';

const reveal = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.15 } } as const;

// Screen on a blueprint stage, with a "› label" caption bar (like the work cards)
const Shot = ({ image, className = '' }: { image: VisualImage; className?: string }) => (
  <motion.figure className={`cs-shot ${className}`.trim()} variants={fadeUp(0, 28)}>
    <div className="cs-shot__stage">
      <img src={image.src} alt={image.alt} loading="lazy" draggable={false} />
    </div>
    {image.label && (
      <figcaption className="cs-shot__bar">
        <span className="cs-shot__caret" aria-hidden="true">›</span>
        {image.label}
      </figcaption>
    )}
  </motion.figure>
);

// Caption rail under a visual (like the capabilities rail on the home page)
const Caption = ({ text }: { text?: string }) =>
  text ? <p className="cs-visual__caption">{text}</p> : null;

// Visual block shown after a case-study section
const CaseStudyVisual = ({ visual }: { visual: Visual }) => {
  switch (visual.kind) {
    case 'system':
      return <OctechSystem />;

    case 'flow':
      return (
        <motion.ol className="cs-flow" variants={stagger(0.08)} {...reveal}>
          {visual.steps.map((step) => (
            <motion.li key={step.title} className="cs-flow__step" variants={fadeUp(0, 20)}>
              <span className="cs-flow__title">{step.title}</span>
              <span className="cs-flow__text">{step.text}</span>
            </motion.li>
          ))}
        </motion.ol>
      );

    case 'image':
      return (
        <motion.div className={`cs-visual${visual.bleed ? ' cs-visual--bleed' : ''}`} variants={stagger()} {...reveal}>
          <Shot image={visual} />
          <Caption text={visual.caption} />
        </motion.div>
      );

    default:
      return (
        <motion.div className={`cs-visual cs-visual--${visual.kind}`} variants={stagger(0.07)} {...reveal}>
          <div className="cs-visual__items">
            {visual.items.map((item) => (
              <Shot key={item.src + item.alt} image={item} className={visual.kind === 'phones' ? 'cs-shot--phone' : ''} />
            ))}
          </div>
          <Caption text={visual.caption} />
        </motion.div>
      );
  }
};

export default CaseStudyVisual;
