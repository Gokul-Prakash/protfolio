import { motion } from 'framer-motion';
import { images } from '@assets/assets';

const slideIn = (x: number, delay = 0) => ({
  hidden: { opacity: 0, x },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const WhoAmISection = () => {
  return (
    <section className="who-am-i">
      <div className="who-am-i__inner">

        {/* Header */}
        <motion.div
          className="who-am-i__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="who-am-i__title">Who I am</h2>
          <p className="who-am-i__subtitle">Finally, meet the man behind the action!</p>
        </motion.div>

        {/* Row 1 — image left, text right */}
        <div className="who-am-i__row">
          <motion.div
            className="who-am-i__col who-am-i__col--image"
            variants={slideIn(-60, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img src={images.whoAmI.container} alt="Gokul — personal moments" draggable={false} />
          </motion.div>

          <motion.div
            className="who-am-i__col who-am-i__col--text"
            variants={slideIn(60, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p>
              I'm Gokul, a designer who works hands-on with fast-moving teams. Born in
              Gudiyattam, Tamil Nadu and based in Bangalore, driven by clarity, simplicity,
              and love for action. I've built brands, interfaces, and systems for founders
              across SaaS, EdTech and AI.
            </p>
            <p>
              That same drive to communicate clearly and explore new perspectives shows up
              in how I work, and how I live. I speak English, Tamil, Kannada, and Hindi —
              and I'm learning Telugu, slowly but surely, one tea at a time&nbsp;;)
            </p>
          </motion.div>
        </div>

        {/* Row 2 — text left, image right */}
        <div className="who-am-i__row">
          <motion.div
            className="who-am-i__col who-am-i__col--text"
            variants={slideIn(-60, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p>
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

          <motion.div
            className="who-am-i__col who-am-i__col--image"
            variants={slideIn(60, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img src={images.whoAmI.container1} alt="Gokul — interests" draggable={false} />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhoAmISection;
