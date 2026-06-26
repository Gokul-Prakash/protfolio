import { motion } from 'framer-motion';
import { images, videos } from '@assets/assets';

const FAN = [
  { img: images.thingsIHelpBuild.image1, rotate: -22, x: '0%',   zIndex: 1 },
  { img: images.thingsIHelpBuild.image2, rotate: -16, x: '11%',  zIndex: 2 },
  { img: images.thingsIHelpBuild.image3, rotate: -11, x: '22%',  zIndex: 3 },
  { img: images.thingsIHelpBuild.image4, rotate: -6,  x: '33%',  zIndex: 4 },
  { img: images.thingsIHelpBuild.image5, rotate: -2,  x: '44%',  zIndex: 5 },
  { img: images.thingsIHelpBuild.image6, rotate:  3,  x: '55%',  zIndex: 6 },
  { img: images.thingsIHelpBuild.image7, rotate:  8,  x: '66%',  zIndex: 7 },
  { img: images.thingsIHelpBuild.image8, rotate: 14,  x: '77%',  zIndex: 8 },
];

const SKILLS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/>
        <line x1="6" y1="8" x2="12" y2="16"/><line x1="18" y1="8" x2="12" y2="16"/>
      </svg>
    ),
    title: 'UX & Product',
    items: ['Product Design', 'User Flows', 'Prototyping', 'Web & Apps'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
      </svg>
    ),
    title: 'Interaction',
    items: ['Motion', 'Micro-interactions', 'UI Systems'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Experience + AI',
    items: ['AI-assisted Design', 'Rapid Exploration', 'Experimental Interfaces'],
  },
];

const ThingsIBuild = () => {
  return (
    <section className="tib">
      {/* Video background */}
      <video className="tib__video" autoPlay muted loop playsInline aria-hidden="true">
        <source src={videos.g5} type="video/webm" />
      </video>

      <div className="tib__content">
        {/* Header */}
        <motion.div
          className="tib__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="tib__title">Things I help build</h2>
          <p className="tib__subtitle">
            Designing products, interactions, and experiences that people enjoy using
          </p>
        </motion.div>

        {/* Fan of images */}
        <div className="tib__fan-wrap">
          <div className="tib__fan">
            {FAN.map((item, i) => (
              <motion.div
                key={i}
                className="tib__fan-item"
                style={{ zIndex: item.zIndex, left: item.x, rotate: item.rotate }}
                initial={{ opacity: 0, y: 60, rotate: item.rotate - 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              >
                <img src={item.img} alt="" draggable={false} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <motion.div
          className="tib__skills"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {SKILLS.map((col) => (
            <div key={col.title} className="tib__skill-col">
              <div className="tib__skill-head">
                <span className="tib__skill-icon">{col.icon}</span>
                <h3 className="tib__skill-title">{col.title}</h3>
              </div>
              <ul className="tib__skill-list">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ThingsIBuild;
