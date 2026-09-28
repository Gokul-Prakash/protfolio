import { motion } from 'framer-motion';
import { images } from '@assets/assets';
import SectionHeading from '../ui/SectionHeading';
import { fadeUp } from '../../utils/animations';

const FACTS = [
  { label: 'Based in', value: 'Bangalore, IN' },
  { label: 'Born in', value: 'Gudiyattam, TN' },
  { label: 'Languages', value: 'EN · TA · KN · HI (+ TE, slowly)' },
  { label: 'Off-duty', value: 'Badminton · Cricket' },
];

const reveal = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
} as const;

const WhoAmISection = () => {
  return (
    <section className="who-am-i">
      <SectionHeading
        label="About"
        title="Who I am."
        description="Finally, meet the man behind the action!"
      />

      {/* Row 1 — image left, text right */}
      <div className="who-am-i__row">
        <motion.figure className="who-am-i__media" variants={fadeUp(0, 40)} {...reveal}>
          <span className="who-am-i__fig">Personal moments</span>
          <img src={images.whoAmI.container} alt="Gokul, with photos from Gudiyattam and Bangalore" draggable={false} />
        </motion.figure>

        <motion.div className="who-am-i__text" variants={fadeUp(0.1, 40)} {...reveal}>
          <p className="who-am-i__lead">
            I'm Gokul, a designer who works hands-on with fast-moving teams. Born in
            Gudiyattam, Tamil Nadu and based in Bangalore, driven by clarity, simplicity,
            and love for action.
          </p>
          <p>
            I've built brands, interfaces, and systems for founders across SaaS, EdTech
            and AI. That same drive to communicate clearly and explore new perspectives
            shows up in how I work, and how I live. I speak English, Tamil, Kannada, and
            Hindi — and I'm learning Telugu, slowly but surely, one tea at a time&nbsp;;)
          </p>

          <dl className="who-am-i__facts">
            {FACTS.map((f) => (
              <div key={f.label} className="who-am-i__fact">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      {/* Row 2 — text left, image right */}
      <div className="who-am-i__row who-am-i__row--reverse">
        <motion.div className="who-am-i__text" variants={fadeUp(0, 40)} {...reveal}>
          <p className="who-am-i__lead">
            Creativity has always been something I'm drawn to — from exploring ideas and
            building interfaces to designing systems that just make sense.
          </p>
          <p>
            When I'm not designing, you'll find me at the badminton court or playing
            cricket with the boys, or just chasing things that keep me moving.
          </p>
          <p>
            Because, at the core of it all, I love helping ideas move faster, cleaner,
            and with fewer misfires. When things click, the experience speaks for itself.
          </p>
        </motion.div>

        <motion.figure className="who-am-i__media" variants={fadeUp(0.1, 40)} {...reveal}>
          <span className="who-am-i__fig">Interests</span>
          <img src={images.whoAmI.container1} alt="Gokul's interests" draggable={false} />
        </motion.figure>
      </div>
    </section>
  );
};

export default WhoAmISection;
