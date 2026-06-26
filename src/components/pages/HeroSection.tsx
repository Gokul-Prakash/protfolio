import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { videos } from '@assets/assets';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      {/* Video background */}
      <div className="hero__bg">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={videos.g5} type="video/webm" />
        </video>
      </div>

      {/* Content */}
      <motion.div className="hero__content" style={{ opacity }}>
        <motion.p
          className="hero__greeting"
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
        >
          HI, I'M GOKUL,
        </motion.p>

        <motion.div className="hero__title-block" style={{ y: titleY }}>
          <motion.h1
            className="hero__title"
            variants={fadeUp(0.2)}
            initial="hidden"
            animate="visible"
          >
            Product Designer
          </motion.h1>
          <motion.span
            className="hero__location"
            variants={fadeUp(0.35)}
            initial="hidden"
            animate="visible"
          >
            BASED IN BANGALORE.
          </motion.span>
        </motion.div>

        <motion.p
          className="hero__description"
          variants={fadeUp(0.45)}
          initial="hidden"
          animate="visible"
        >
          I'm an experienced web and UX/UI designer, creating memorable
          <br />
          digital experiences for brands of all sizes
        </motion.p>

        <motion.div
          className="hero__cta"
          variants={fadeUp(0.55)}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            className="hero__btn hero__btn--dark"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            View Projects&nbsp;
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <motion.button
            className="hero__btn hero__btn--light"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Download Resume&nbsp;
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v7M4 7l3 3 3-3M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
