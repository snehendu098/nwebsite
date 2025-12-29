import { ParallaxLayer, SplitText, MagneticButton } from "@/components/ui";
import { contactInfo } from "@/data/data";

export const ContactSection = () => (
  <section id="contact" className="contact">
    <ParallaxLayer speed={0.3} className="contact-glow-wrapper">
      <div className="contact-glow glow-1" />
    </ParallaxLayer>
    <ParallaxLayer speed={-0.3} className="contact-glow-wrapper">
      <div className="contact-glow glow-2" />
    </ParallaxLayer>

    <div className="section-container">
      <ParallaxLayer speed={-0.15}>
        <div className="contact-content">
          <span className="section-tag">Get Started</span>
          <h2 className="contact-title">
            <SplitText text="Ready to Transform" />
            <br />
            <SplitText text="Your Business?" className="accent" delay={0.2} />
          </h2>
          <p className="contact-desc">
            Let's discuss your project and bring your vision to life with
            cutting-edge technology solutions.
          </p>

          <div className="contact-actions">
            <MagneticButton
              href={`mailto:${contactInfo.email}`}
              className="btn-primary large"
            >
              Get in Touch
              <svg viewBox="0 0 24 24" className="btn-arrow">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </MagneticButton>
          </div>

          <div className="contact-email">
            <a href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
          </div>
        </div>
      </ParallaxLayer>
    </div>
  </section>
);
