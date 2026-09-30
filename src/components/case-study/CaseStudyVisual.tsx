import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, fadeUp, stagger } from '../../utils/animations';
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
const Caption = ({ text }: { text?: string }) => (text ? <p className="cs-visual__caption">{text}</p> : null);

// Crossfading screen, keyed by src
const Screen = ({ image }: { image: VisualImage }) => (
  <div className="cs-screen">
    <AnimatePresence initial={false}>
      <motion.img
        key={image.src}
        src={image.src}
        alt={image.alt}
        draggable={false}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </AnimatePresence>
  </div>
);

// Interactive replica of a rotating hero: auto-cycles, click a phrase to jump
const HeroReplica = ({ lead, items }: { lead: string; items: VisualImage[] }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % items.length), 2800);
    return () => clearTimeout(id);
  }, [index, paused, items.length]);

  return (
    <motion.div
      className="cs-hero"
      variants={fadeUp(0, 28)}
      {...reveal}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Screen image={items[index]} />
      <div className="cs-hero__phrases" role="tablist" aria-label="Hero states">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`cs-hero__phrase${i === index ? ' is-active' : ''}`}
            onClick={() => setIndex(i)}
          >
            <span className="cs-hero__lead">{lead}</span> {item.label}
            {i === index && !paused && <span key={index} className="cs-hero__timer" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// Tabbed viewer — mirrors the product tab bar on the site itself
const TabViewer = ({ items }: { items: VisualImage[] }) => {
  const [index, setIndex] = useState(0);
  const item = items[index];

  return (
    <motion.div className="cs-tabs" variants={fadeUp(0, 28)} {...reveal}>
      <div className="cs-tabs__bar" role="tablist" aria-label="Products">
        {items.map((it, i) => (
          <button
            key={it.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`cs-tabs__tab${i === index ? ' is-active' : ''}`}
            onClick={() => setIndex(i)}
          >
            {it.label}
          </button>
        ))}
      </div>
      <Screen image={item} />
      <div className="cs-tabs__info" aria-live="polite">
        <span className="cs-shot__caret" aria-hidden="true">›</span>
        <strong>{item.label}</strong>
        <span>{item.text}</span>
      </div>
    </motion.div>
  );
};

// Visual block shown after a case-study section
const CaseStudyVisual = ({ visual }: { visual: Visual }) => {
  switch (visual.kind) {
    case 'system':
      return <OctechSystem />;

    case 'hero':
      return <HeroReplica lead={visual.lead} items={visual.items} />;

    case 'tabs':
      return <TabViewer items={visual.items} />;

    case 'chips':
      return (
        <motion.div className="cs-chips" variants={stagger(0.06)} {...reveal}>
          {visual.groups.map((group) => (
            <motion.div key={group.label} className="cs-chips__group" variants={fadeUp(0, 16)}>
              <span className="cs-chips__label">{group.label}</span>
              <ul className="cs-chips__list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      );

    case 'cells':
      return (
        <motion.ul className="cs-cells" variants={stagger(0.07)} {...reveal}>
          {visual.items.map((cell) => (
            <motion.li key={cell.title} className="cs-cells__cell" variants={fadeUp(0, 20)}>
              <strong>{cell.title}</strong>
              <span>{cell.text}</span>
            </motion.li>
          ))}
        </motion.ul>
      );

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
