import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../utils/animations';

// A live specimen of the Octech visual system — colour, type, labels, actions, cards.
// Values taken from octech.in (Urbanist; Octech Red #F50000; navy #101828; neutrals).
const SWATCHES = [
  { name: 'Octech Red', hex: '#F50000', role: 'Brand & next action', ink: '#fff' },
  { name: 'Deep Navy', hex: '#101828', role: 'Weight & emphasis', ink: '#fff' },
  { name: 'Canvas', hex: '#F7F7F5', role: 'Base surface', ink: '#101828' },
  { name: 'White', hex: '#FFFFFF', role: 'Cards & containers', ink: '#101828' },
];

const OctechSystem = () => (
  <motion.div
    className="octech-system"
    variants={stagger(0.08)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    {/* Colour */}
    <motion.div className="octech-system__swatches" variants={fadeUp(0, 20)}>
      {SWATCHES.map((s) => (
        <div key={s.name} className="octech-system__swatch" style={{ background: s.hex, color: s.ink }}>
          <span className="octech-system__swatch-name">{s.name}</span>
          <span className="octech-system__swatch-meta">
            {s.hex} · {s.role}
          </span>
        </div>
      ))}
    </motion.div>

    {/* Type */}
    <motion.div className="octech-system__type" variants={fadeUp(0, 20)}>
      <span className="octech-system__label">
        <i aria-hidden="true" /> Typography — Urbanist
      </span>
      <p className="octech-system__display">
        We make <em>brands playable.</em>
      </p>
      <p className="octech-system__body">
        Scan-to-win, on-pack codes, retailer schemes and seasonal campaigns, run as infrastructure rather than
        one-off activations.
      </p>
      <div className="octech-system__scale" aria-hidden="true">
        <span style={{ fontSize: 56 }}>Aa</span>
        <span style={{ fontSize: 36 }}>Aa</span>
        <span style={{ fontSize: 24 }}>Aa</span>
        <span style={{ fontSize: 16 }}>Aa</span>
      </div>
    </motion.div>

    {/* Components */}
    <motion.div className="octech-system__components" variants={fadeUp(0, 20)}>
      <span className="octech-system__label">
        <i aria-hidden="true" /> How we deliver
      </span>
      <div className="octech-system__card">
        <h4>Consumer Promotions</h4>
        <p>Scan-to-win, on-pack codes and seasonal campaigns.</p>
        <div className="octech-system__tags">
          <span>On-pack codes</span>
          <span>Instant win</span>
          <span>Fulfilment</span>
        </div>
      </div>
      <div className="octech-system__actions">
        <span className="octech-system__btn">Talk to us →</span>
        <span className="octech-system__pill">Our Products + &nbsp; Industries &nbsp; Case Studies</span>
      </div>
      <div className="octech-system__highlights" aria-hidden="true">
        <span style={{ background: '#fff3a3' }}>redemption</span>
        <span style={{ background: '#ffe2a8' }}>active participants</span>
        <span style={{ background: '#c9f5e3' }}>Optimise every campaign.</span>
      </div>
    </motion.div>
  </motion.div>
);

export default OctechSystem;
