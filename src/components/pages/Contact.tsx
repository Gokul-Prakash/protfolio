import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../ui/PageHero';
import StripeButton from '../ui/StripeButton';
import RollingText from '../ui/RollingText';
import { fadeUp } from '../../utils/animations';
import { EMAIL, SOCIAL_LINKS } from '../../utils/content';

const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY';

const FIELDS = [
  { id: 'user_name', label: 'Your name', type: 'text', placeholder: 'e.g. John Doe' },
  { id: 'user_email', label: 'Email address', type: 'email', placeholder: 'name@company.com' },
] as const;

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;

    setSending(true);
    setStatus('idle');

    const formData = new FormData(formRef.current);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="contact">
      <PageHero kicker="Contact / Say hello" title="Let's talk">
        <p>
          Building something new? Have a question? Or just want to say hi? I'm always
          open to talking design and product.
        </p>
      </PageHero>

      <section className="contact__body">
        {/* Left — info */}
        <motion.div
          className="contact__info"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="contact__row">
            <span className="contact__label">Email me at</span>
            <a href={`mailto:${EMAIL}`} className="contact__email">
              {EMAIL}
            </a>
          </div>

          <div className="contact__row">
            <span className="contact__label">Follow the journey</span>
            <div className="contact__social-links">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="contact__social-link" target="_blank" rel="noreferrer">
                  <RollingText text={label} />
                </a>
              ))}
            </div>
          </div>

          <div className="contact__row">
            <span className="contact__label">Location</span>
            <p className="contact__blurb">
              Based in Bangalore, India—working with teams worldwide. Whether you're a
              startup looking for a founding designer or an established brand needing a
              fresh perspective, let's create something meaningful.
            </p>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.form
          ref={formRef}
          className="contact__form"
          onSubmit={handleSubmit}
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="contact__form-head">
            <span>New message</span>
            <span aria-hidden="true">›_</span>
          </div>

          {FIELDS.map((f, i) => (
            <div className="contact__field" key={f.id}>
              <label className="contact__field-label" htmlFor={f.id}>
                <span className="contact__field-index">0{i + 1}</span> {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                placeholder={f.placeholder}
                required
                className="contact__input"
              />
            </div>
          ))}

          <div className="contact__field">
            <label className="contact__field-label" htmlFor="message">
              <span className="contact__field-index">03</span> Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              required
              rows={5}
              className="contact__textarea"
            />
          </div>

          <div className="contact__submit-row">
            <StripeButton type="submit" variant="primary" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </StripeButton>

            <p className="contact__status" role="status" aria-live="polite">
              {status === 'success' && (
                <span className="contact__status--success">Message sent! I'll get back to you soon.</span>
              )}
              {status === 'error' && (
                <span className="contact__status--error">
                  Something went wrong. Please try again or email directly.
                </span>
              )}
            </p>
          </div>
        </motion.form>
      </section>
    </main>
  );
};

export default Contact;
