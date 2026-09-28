import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { videos } from '@assets/assets';
import FitText from '../ui/FitText';
import StripeButton from '../ui/StripeButton';
import { fadeUp, stagger } from '../../utils/animations';
import { RESUME_URL, SKILLS } from '../../utils/content';

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
        {/* Meta divider — greeting · rule · location */}
        <motion.div className="hero__meta" variants={fadeUp()}>
          <span>Hi, I'm Gokul</span>
          <span className="hero__meta-rule" aria-hidden="true" />
          <span>Based in Bangalore, IN</span>
        </motion.div>

        {/* Title — fills the full width; two lines on phones */}
        <motion.div className="hero__title" style={{ y: titleY }}>
          <motion.div variants={fadeUp(0, 48)}>
            <FitText lines={['Product Designer']} mobileLines={['Product', 'Designer']} />
          </motion.div>
        </motion.div>

        {/* Description + actions */}
        <div className="hero__bottom">
          <motion.p className="hero__description" variants={fadeUp()}>
            I'm an experienced web and UX/UI designer, creating memorable digital
            experiences for brands of all sizes.
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

        {/* Numbered capability cells */}
        <motion.ol className="hero__features" variants={fadeUp()}>
          {SKILLS.map((skill, i) => (
            <li key={skill.title} className="hero__feature">
              <span className="hero__feature-index">0{i + 1}</span>
              <span className="hero__feature-name">{skill.title}</span>
              <span className="hero__feature-blurb">{skill.items.join(' · ')}</span>
            </li>
          ))}
        </motion.ol>

        <motion.div className="ribbon hero__ribbon" variants={fadeUp()} aria-hidden="true">
          <span className="ribbon__mark">+</span>
          <span className="ribbon__rule" />
          <span className="ribbon__mark">+</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
