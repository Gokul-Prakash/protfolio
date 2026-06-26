import { motion } from 'framer-motion';
import { videos } from '@assets/assets';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const Playground = () => {
  return (
    <main className="playground">
      {/* Hero */}
      <section className="playground__hero">
        <div className="playground__hero-bg">
          <video
            className="playground__hero-video"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src={videos.g5} type="video/webm" />
          </video>
        </div>
        <motion.div
          className="playground__hero-content"
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
        >
          <h1 className="playground__title">Playground</h1>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="playground__body">
        <motion.p
          className="playground__description"
          variants={fadeUp(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Playground is my experimental lab where I break rules
          and try new tools. It's about curiosity over
          constraints—where a 3D doodle might become a UI system,
          and a mistake might become an aesthetic.
        </motion.p>

        <div className="playground__grid">
          {/* Row 1 — 2 cards */}
          <motion.div className="playground__card playground__card--half" variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="playground__card-thumb playground__card-thumb--tall" />
          </motion.div>
          <motion.div className="playground__card playground__card--half" variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="playground__card-thumb playground__card-thumb--tall" />
          </motion.div>

          {/* Row 2 — 3 cards */}
          <motion.div className="playground__card playground__card--third" variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="playground__card-thumb" />
          </motion.div>
          <motion.div className="playground__card playground__card--third" variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="playground__card-thumb" />
          </motion.div>
          <motion.div className="playground__card playground__card--third" variants={fadeUp(0.26)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="playground__card-thumb" />
          </motion.div>

          {/* Row 3 — 1 full-width card */}
          <motion.div className="playground__card playground__card--full" variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="playground__card-thumb playground__card-thumb--tall" />
          </motion.div>

          {/* Row 4 — 2 cards */}
          <motion.div className="playground__card playground__card--half" variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="playground__card-thumb" />
          </motion.div>
          <motion.div className="playground__card playground__card--half" variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="playground__card-thumb" />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Playground;
