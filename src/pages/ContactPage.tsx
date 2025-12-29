import { PageLayout } from "@/components/common/PageLayout";
import { ParallaxLayer, TiltCard, MagneticButton, Icon } from "@/components/ui";
import { contactInfo, socialLinks } from "@/data/data";

export const ContactPage = () => {
  return (
    <PageLayout
      tag="Contact Us"
      title="Let's Build"
      titleAccent="Something Great"
      description="Ready to transform your business? Get in touch with us today."
    >
      <div className="section-container">
        <div className="page-section">
          <div className="contact-grid">
            <ParallaxLayer speed={0.1}>
              <TiltCard className="contact-info-card">
                <h3 className="contact-info-title">Get in Touch</h3>
                <div className="contact-info-items">
                  <div className="contact-info-item">
                    <span className="contact-icon"><Icon name="mail" /></span>
                    <div>
                      <h4>Email</h4>
                      <a href={`mailto:${contactInfo.email}`}>
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-icon"><Icon name="map-pin" /></span>
                    <div>
                      <h4>Location</h4>
                      <p>{contactInfo.location}</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-icon"><Icon name="clock" /></span>
                    <div>
                      <h4>Working Hours</h4>
                      <p>{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
                <div className="contact-social">
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    {socialLinks.map((link) => (
                      <a key={link.name} href={link.href} className="social-link">
                        {link.icon === "linkedin" && (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        )}
                        {link.icon === "twitter" && (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </ParallaxLayer>

            <ParallaxLayer speed={0.15}>
              <TiltCard className="contact-form-card">
                <h3 className="contact-form-title">Send us a Message</h3>
                <form className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <MagneticButton href="#" className="btn-primary submit-btn">
                    Send Message
                    <svg viewBox="0 0 24 24" className="btn-arrow">
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </MagneticButton>
                </form>
              </TiltCard>
            </ParallaxLayer>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
