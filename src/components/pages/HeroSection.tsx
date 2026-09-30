import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { videos } from '@assets/assets';
import RotatingHeadline from '../ui/RotatingHeadline';
import StripeButton from '../ui/StripeButton';
import { fadeUp, stagger } from '../../utils/animations';
import { RESUME_URL } from '../../utils/content';

// Human → brand → product → business, then loops. First letters alternate p/b,
// so the initial flips on every change (see RotatingHeadline).
const HEADLINE_WORDS = ['people', 'brands', 'products', 'business'];

const ArrowDown = () => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M2.5 7.5 7 12l4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

const Download = () => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1.5v7.5M4 6l3 3 3-3M2 12.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero tone-light" ref={ref}>
      {/* Video background + blueprint grid */}
      <div className="hero__bg" aria-hidden="true">
        <video className="hero__video" autoPlay muted loop playsInline>
          <source src={videos.g5} type="video/webm" />
        </video>
        <div className="hero__grid" />
      </div>

      <motion.div
        className="hero__content"
        style={{ opacity }}
        variants={stagger(0.08, 0.1)}
        initial="hidden"
        animate="visible"
      >
        {/* Meta — greeting · location */}
        <motion.div className="hero__meta" variants={fadeUp()}>
          <span>Hi, I'm Gokul</span>
          <span>Based in Bangalore, IN</span>
        </motion.div>

        {/* Headline — "I design for" + rotating word, sized to fill the full width */}
        <motion.div className="hero__title" style={{ y: titleY }}>
          <motion.div variants={fadeUp(0, 48)}>
            <RotatingHeadline lead="I design for" words={HEADLINE_WORDS} suffix="." />
          </motion.div>
        </motion.div>

        {/* Description + actions */}
        <div className="hero__bottom">
          <motion.p className="hero__description" variants={fadeUp()}>
            Product designer creating digital products and experiences across UX, UI,
            interaction, and visual design.
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp()}>
            <StripeButton href="#work" variant="primary" icon={<ArrowDown />}>
              View projects
            </StripeButton>
            <StripeButton href={RESUME_URL} variant="framed" icon={<Download />} external>
              Download resume
            </StripeButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
