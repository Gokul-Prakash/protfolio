import { motion } from 'framer-motion';
import { images, videos } from '@assets/assets';
import StripeButton from '../ui/StripeButton';
import { EASE } from '../../utils/animations';
import { EMAIL } from '../../utils/content';

// "Let's build it. Or make it better." — video contact card.
// Shared by the site footer and the end of the case-study sheet (styles: _footer.scss).
const ContactCard = () => (
  <motion.div
    className="footer__card tone-light"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: EASE }}
  >
    <video className="footer__video" autoPlay muted loop playsInline aria-hidden="true">
      <source src={videos.g5} type="video/webm" />
    </video>

    <div className="footer__card-content">
      <span className="footer__kicker">Contact</span>
      <h2 className="footer__heading">
        Let's build it.
        <br />
        Or make it better.
      </h2>
      <p className="footer__subtext">
        If something feels stuck, unclear, or not working, I can help figure it out.
      </p>
      <div className="footer__actions">
        <StripeButton href={`mailto:${EMAIL}`} variant="primary">
          Get in touch
        </StripeButton>
        <StripeButton to="/contact" variant="framed">
          Contact form
        </StripeButton>
      </div>
    </div>

    <div className="footer__illustration" aria-hidden="true">
      <img src={images.footer.footerImg} alt="" draggable={false} />
    </div>
  </motion.div>
);

export default ContactCard;
