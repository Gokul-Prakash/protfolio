import { motion } from 'framer-motion';
import { images, videos } from '@assets/assets';

const NAV_LEFT = [
  { label: 'Work', href: '/works' },
  { label: 'Playground', href: '/playground' },
];

const NAV_RIGHT = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Behance', href: '#' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Card with video background */}
        <motion.div
          className="footer__card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Video bg */}
          <video
            className="footer__video"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src={videos.g5} type="video/webm" />
          </video>

          {/* Text content */}
          <div className="footer__card-content">
            <h2 className="footer__heading">
              Let's build it.<br />Or make it better.
            </h2>
            <p className="footer__subtext">
              If something feels stuck, unclear, or not working,<br />
              I can help figure it out.
            </p>
            <motion.a
              href="mailto:hello@gokul.design"
              className="footer__cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Get in touch
            </motion.a>
          </div>

          {/* Character illustration */}
          <div className="footer__illustration">
            <img src={images.footer.footerImg} alt="" draggable={false} />
          </div>
        </motion.div>

        {/* Right — nav + copyright */}
        <div className="footer__right">
          <nav className="footer__nav">
            <div className="footer__nav-col">
              {NAV_LEFT.map(({ label, href }) => (
                <a key={label} href={href} className="footer__nav-link">{label}</a>
              ))}
            </div>
            <div className="footer__nav-col">
              {NAV_RIGHT.map(({ label, href }) => (
                <a key={label} href={href} className="footer__nav-link" target="_blank" rel="noreferrer">
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <p className="footer__copy">©{year} Gokul&nbsp;&nbsp;|&nbsp;&nbsp;Terms &amp; Conditions</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
