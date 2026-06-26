import { useState, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { videos } from "@assets/assets";

const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "GitHub", href: "#" },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;

    setSending(true);
    setStatus("idle");

    const formData = new FormData(formRef.current);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        formRef.current.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="contact">
      {/* Hero */}
      <section className="contact__hero">
        <div className="contact__hero-bg">
          <video
            className="contact__hero-video"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src={videos.g5} type="video/webm" />
          </video>
        </div>
        <motion.div
          className="contact__hero-content"
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
        >
          <h1 className="contact__title">Let's Talk</h1>
          <p className="contact__subtitle">
            Building something new? Have a question? Or just want to say
            <br />
            hi? I'm always open to talking design and product.
          </p>
        </motion.div>
      </section>

      {/* Body */}
      <section className="contact__body">
        <div className="contact__body-inner">
          {/* Left — info */}
          <motion.div
            className="contact__info"
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="contact__email-block">
              <span className="contact__label">EMAIL ME AT</span>
              <a href="mailto:hello@gokul.design" className="contact__email">
                hello@gokul.design
              </a>
            </div>

            <div className="contact__social-block">
              <span className="contact__label">FOLLOW THE JOURNEY</span>
              <div className="contact__social-links">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="contact__social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <p className="contact__blurb">
              Based in Bangalore, India—working with teams worldwide. Whether
              you're a startup looking for a founding designer or an established
              brand needing a fresh perspective, let's create something
              meaningful.
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.form
            ref={formRef}
            className="contact__form"
            onSubmit={handleSubmit}
            variants={fadeUp(0.35)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="contact__field">
              <label className="contact__field-label" htmlFor="user_name">
                YOUR NAME
              </label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                placeholder="e.g. John Doe"
                required
                className="contact__input"
              />
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="user_email">
                EMAIL ADDRESS
              </label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                placeholder="name@company.com"
                required
                className="contact__input"
              />
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="message">
                MESSAGE
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

            <motion.button
              type="submit"
              className="contact__submit"
              disabled={sending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {sending ? "Sending..." : "Send Message"}
            </motion.button>

            {status === "success" && (
              <p className="contact__status contact__status--success">
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="contact__status contact__status--error">
                Something went wrong. Please try again or email directly.
              </p>
            )}
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
