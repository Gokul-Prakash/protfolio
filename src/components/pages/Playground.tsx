import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PageHero from '../ui/PageHero';
import SectionHeading from '../ui/SectionHeading';
import { fadeUp } from '../../utils/animations';
import { PLAYGROUND, type PlaygroundMedia } from '../../content/playground';

const DEFAULT_HOLD = 3000;

// Media taking turns on one stage: all stacked, the current one faded in.
// Labels along the bottom jump to a state; the active one fills over its hold.
// Only runs while on screen, and every layer loads up front so a turn never
// fades to an image that isn't there yet.
const CycleStage = ({ media }: { media: PlaygroundMedia[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [index, setIndex] = useState(0);
  const hold = media[index].hold ?? DEFAULT_HOLD;

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % media.length), hold);
    return () => clearTimeout(id);
  }, [index, hold, media.length, inView]);

  return (
    <div ref={ref} className="playground__card-cycle">
      {media.map((m, i) => (
        <div
          key={m.src}
          className={`playground__card-media playground__card-media--layer${i === index ? ' is-active' : ''}`}
          aria-hidden={i !== index}
        >
          <img src={m.src} alt={m.alt} decoding="async" draggable={false} />
        </div>
      ))}
      <div className="playground__card-states" role="tablist" aria-label="States">
        {media.map((m, i) => (
          <button
            key={m.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`playground__card-state${i === index ? ' is-active' : ''}`}
            onClick={() => setIndex(i)}
          >
            {m.label}
            {i === index && inView && (
              <span
                key={index}
                className="playground__card-timer"
                style={{ animationDuration: `${hold}ms` }}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const Playground = () => {
  return (
    <main className="playground">
      <PageHero kicker="Playground / Lab" title="Playground" />

      <section className="playground__body">
        <SectionHeading
            label="Experiments"
          title="Curiosity over constraints."
          description="Playground is my experimental lab where I break rules and try new tools, where a 3D doodle might become a UI system, and a mistake might become an aesthetic."
        />

        <div className="playground__grid">
          {PLAYGROUND.map((tile, i) => (
            <motion.figure
              key={tile.title}
              className={`playground__card${tile.wide ? ' playground__card--wide' : ''}`}
              style={{ '--cols': tile.span[0], '--rows': tile.span[1], '--ratio': tile.ratio } as React.CSSProperties}
              variants={fadeUp((i % 3) * 0.08, 32)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div
                className={`playground__card-thumb playground__card-thumb--${tile.fit ?? 'contain'}${tile.dark ? ' playground__card-thumb--dark' : ''}`}
              >
                {tile.cycle ? (
                  <CycleStage media={tile.media} />
                ) : (
                  tile.media.map((m) => (
                    <div key={m.src} className="playground__card-media">
                      <img src={m.src} alt={m.alt} loading="lazy" decoding="async" draggable={false} />
                      {m.label && <span className="playground__card-label">{m.label}</span>}
                    </div>
                  ))
                )}
              </div>

              <figcaption className="playground__card-row">
                <span className="playground__card-title">{tile.title}</span>
                <span className="playground__card-tags">{tile.tags}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Playground;
