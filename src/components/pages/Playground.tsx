import { motion } from 'framer-motion';
import PageHero from '../ui/PageHero';
import SectionHeading from '../ui/SectionHeading';
import { fadeUp } from '../../utils/animations';

// Layout of the experiment grid (6-col): half = 3, third = 2, full = 6
const TILES = [
  { size: 'half', tall: true },
  { size: 'half', tall: true },
  { size: 'third' },
  { size: 'third' },
  { size: 'third' },
  { size: 'full', tall: true },
  { size: 'half' },
  { size: 'half' },
] as const;

const Playground = () => {
  return (
    <main className="playground">
      <PageHero kicker="Playground / Lab" title="Playground" />

      <section className="playground__body">
        <SectionHeading
            label="Experiments"
          title="Curiosity over constraints."
          description="Playground is my experimental lab where I break rules and try new tools — where a 3D doodle might become a UI system, and a mistake might become an aesthetic."
        />

        <div className="playground__grid">
          {TILES.map((tile, i) => (
            <motion.div
              key={i}
              className={`playground__card playground__card--${tile.size}`}
              variants={fadeUp((i % 3) * 0.08, 32)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className={`playground__card-thumb${'tall' in tile && tile.tall ? ' playground__card-thumb--tall' : ''}`}>
                <span className="playground__card-soon">Coming soon</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Playground;
