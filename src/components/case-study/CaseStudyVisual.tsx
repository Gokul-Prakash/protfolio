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

// Zoomed detail: shows only the `crop` box of the source image
export const CropImage = ({ image, maxHeight = 280 }: { image: VisualImage; maxHeight?: number }) => {
  if (!image.crop || !image.size) return <img src={image.src} alt={image.alt} loading="lazy" draggable={false} />;
  const [x, y, w, h] = image.crop;
  const [W] = image.size;
  return (
    // Width is capped from the crop's own shape, so tall and wide details sit at a similar size
    <div className="cs-crop__frame" style={{ aspectRatio: `${w} / ${h}`, maxWidth: `min(100%, ${(maxHeight * w) / h}px)` }}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        draggable={false}
        style={{ width: `${(W / w) * 100}%`, left: `${(-x / w) * 100}%`, top: `${(-y / h) * 100}%` }}
      />
    </div>
  );
};

// Phone mockup around a mobile screen
const Device = ({ image }: { image: VisualImage }) => (
  <div className="cs-device">
    <img src={image.src} alt={image.alt} loading="lazy" draggable={false} />
  </div>
);

// Visual block shown after a case-study section
const CaseStudyVisual = ({ visual }: { visual: Visual }) => {
  switch (visual.kind) {
    case 'system':
      return <OctechSystem />;

    case 'devices':
      return (
        <motion.div
          className={`cs-devices${visual.journey ? ' cs-devices--journey' : ''}`}
          style={{ '--count': visual.items.length } as React.CSSProperties}
          variants={stagger(0.08)}
          {...reveal}
        >
          {visual.items.map((item, i) => (
            <motion.figure key={item.src} className="cs-devices__item" variants={fadeUp(0, 32)}>
              <Device image={item} />
              {item.label && <figcaption className="cs-devices__label">{item.label}</figcaption>}
              {visual.journey && i < visual.items.length - 1 && (
                <span className="cs-devices__link" aria-hidden="true">→</span>
              )}
            </motion.figure>
          ))}
        </motion.div>
      );

    case 'annotated':
      return (
        <motion.div className={`cs-annotated${visual.flip ? ' cs-annotated--flip' : ''}`} variants={stagger(0.07)} {...reveal}>
          <motion.div className="cs-annotated__stage" variants={fadeUp(0, 32)}>
            <Device image={visual.image} />
          </motion.div>
          <ol className="cs-annotated__notes">
            {visual.notes.map((note) => (
              <motion.li key={note.title} className="cs-annotated__note" variants={fadeUp(0, 16)}>
                <strong>{note.title}</strong>
                <span>{note.text}</span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      );

    case 'crops':
      return (
        <motion.ul className="cs-crops" variants={stagger(0.07)} {...reveal}>
          {visual.items.map((item) => (
            <motion.li key={item.label} className="cs-crops__item" variants={fadeUp(0, 20)}>
              <div className="cs-crops__stage">
                <CropImage image={item} />
              </div>
              <div className="cs-crops__text">
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      );

    case 'compare':
      return (
        <motion.div className="cs-compare" variants={stagger(0.07)} {...reveal}>
          <div className="cs-compare__head" aria-hidden="true">
            <span>Before</span>
            <span>After</span>
          </div>
          {visual.pairs.map((pair) => (
            <motion.div key={pair.label} className="cs-compare__row" variants={fadeUp(0, 24)}>
              <span className="cs-compare__label">{pair.label}</span>
              <figure className="cs-compare__cell cs-compare__cell--before">
                <Device image={pair.before} />
              </figure>
              <span className="cs-compare__arrow" aria-hidden="true">→</span>
              <figure className="cs-compare__cell">
                <Device image={pair.after} />
              </figure>
            </motion.div>
          ))}
        </motion.div>
      );

    case 'logo':
      return (
        <motion.div className="cs-logo" variants={stagger(0.08)} {...reveal}>
          <motion.figure className="cs-logo__cell cs-logo__cell--before" variants={fadeUp(0, 20)}>
            <div className="cs-logo__stage">
              <CropImage image={visual.before} maxHeight={150} />
            </div>
            <figcaption className="cs-shot__bar">
              <span className="cs-shot__caret" aria-hidden="true">›</span>Before
            </figcaption>
          </motion.figure>
          <motion.figure className="cs-logo__cell cs-logo__cell--mark" variants={fadeUp(0, 20)}>
            <div className="cs-logo__stage">
              <img className="cs-logo__mark" src={visual.mark.src} alt={visual.mark.alt} draggable={false} />
            </div>
            <figcaption className="cs-shot__bar">
              <span className="cs-shot__caret" aria-hidden="true">›</span>New mark & wordmark
            </figcaption>
          </motion.figure>
          <motion.figure className="cs-logo__cell cs-logo__cell--lockup" variants={fadeUp(0, 20)}>
            <div className="cs-logo__stage">
              <CropImage image={visual.lockup} maxHeight={230} />
            </div>
            <figcaption className="cs-shot__bar">
              <span className="cs-shot__caret" aria-hidden="true">›</span>Lockup
            </figcaption>
          </motion.figure>
          <motion.figure className="cs-logo__cell cs-logo__cell--use" variants={fadeUp(0, 20)}>
            <div className="cs-logo__stage">
              <Device image={visual.inUse} />
            </div>
            <figcaption className="cs-shot__bar">
              <span className="cs-shot__caret" aria-hidden="true">›</span>In use · Splash
            </figcaption>
          </motion.figure>
        </motion.div>
      );

    case 'palette':
      return (
        <motion.div className="cs-palette" variants={stagger(0.07)} {...reveal}>
          <motion.div className="cs-palette__swatches" variants={fadeUp(0, 20)}>
            {visual.swatches.map((sw) => (
              <div key={sw.name} className="cs-palette__swatch" style={{ background: sw.hex, color: sw.ink }}>
                <span className="cs-palette__swatch-name">{sw.name}</span>
                <span className="cs-palette__swatch-meta">
                  {sw.hex} · {sw.role}
                </span>
              </div>
            ))}
          </motion.div>
          <motion.div className="cs-palette__type" variants={fadeUp(0, 20)}>
            <span className="cs-palette__label">Typography</span>
            <span className="cs-palette__typeface">{visual.typeface}</span>
            {visual.hierarchy ? (
              <dl className="cs-palette__scale">
                {visual.hierarchy.map((h) => (
                  <div key={h.style} className="cs-palette__scale-row">
                    <dt>{h.style}</dt>
                    <dd>{h.weight}</dd>
                    <dd>{h.use}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <span className="cs-palette__sample">Play. Discover. Earn.</span>
            )}
          </motion.div>

          {(visual.gradient || visual.accents) && (
            <motion.div className="cs-palette__extras" variants={fadeUp(0, 20)}>
              {visual.gradient && (
                <div
                  className="cs-palette__gradient"
                  style={{ background: `linear-gradient(90deg, ${visual.gradient[0]}, ${visual.gradient[1]})` }}
                >
                  <span>Primary action gradient</span>
                  <span>
                    {visual.gradient[0]} → {visual.gradient[1]}
                  </span>
                </div>
              )}
              {visual.accents && (
                <ul className="cs-palette__accents">
                  {visual.accents.map((a) => (
                    <li key={a.name}>
                      <span className="cs-palette__chip" style={{ background: a.hex }} aria-hidden="true" />
                      <strong>{a.name}</strong>
                      <span>
                        {a.hex} · {a.role}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
          <ul className="cs-palette__components">
            {visual.components.map((c) => (
              <motion.li key={c.label} className="cs-palette__component" variants={fadeUp(0, 16)}>
                <div className="cs-palette__component-stage">
                  <CropImage image={c} />
                </div>
                <span className="cs-palette__component-bar">
                  <span className="cs-shot__caret" aria-hidden="true">›</span>
                  {c.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      );

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
