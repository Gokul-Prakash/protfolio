import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { videos } from '@assets/assets';
import { fadeUp, stagger } from '../../utils/animations';

type PageHeroProps = {
  kicker: string;
  title: string;
  children?: ReactNode;
};

// Light video band used at the top of inner pages
const PageHero = ({ kicker, title, children }: PageHeroProps) => (
  <section className="page-hero tone-light">
    <div className="page-hero__bg" aria-hidden="true">
      <video className="page-hero__video" autoPlay muted loop playsInline>
        <source src={videos.g5} type="video/webm" />
      </video>
      <div className="page-hero__grid" />
    </div>

    <motion.div
      className="page-hero__content"
      variants={stagger(0.08, 0.1)}
      initial="hidden"
      animate="visible"
    >
      <motion.p className="page-hero__kicker" variants={fadeUp()}>
        {kicker}
      </motion.p>
      <motion.h1 className="page-hero__title" variants={fadeUp(0, 48)}>
        {title}
      </motion.h1>
      {children && (
        <motion.div className="page-hero__subtitle" variants={fadeUp()}>
          {children}
        </motion.div>
      )}
    </motion.div>
  </section>
);

export default PageHero;
