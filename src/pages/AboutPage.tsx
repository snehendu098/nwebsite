import { PageLayout } from "@/components/common/PageLayout";
import { FloatingConstellation } from "@/components/effects";
import { ParallaxLayer, TiltCard, MagneticButton, Icon, SplitText } from "@/components/ui";
import {
  aboutFounderStory,
  aboutServicesExpanded,
  aboutOperatingPrinciples,
  aboutClientReasons,
  aboutMotto,
  aboutVision,
  aboutCommitment,
  aboutClosingStatement,
} from "@/data/data";

export const AboutPage = () => {
  return (
    <>
      <FloatingConstellation name="cassiopeia" />
      <PageLayout
        tag="About Us"
        title="About Infiniti"
        titleAccent="Tech Partners"
        description="A Founder Who Built, Broke, and Rebuilt Technology Until It Made Sense"
      >
        <div className="section-container">
          {/* Founder Story */}
          <div className="page-section">
            <ParallaxLayer speed={0.1}>
              <div className="about-intro-full">
                {aboutFounderStory.map((paragraph, i) => (
                  <p
                    key={i}
                    className="about-text-large"
                    style={{ marginBottom: i < aboutFounderStory.length - 1 ? "1.5rem" : 0 }}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </ParallaxLayer>
          </div>

          {/* Company Evolution */}
          <div className="page-section">
            <ParallaxLayer speed={-0.2}>
              <div className="section-header">
                <h2 className="section-title">
                  <SplitText text="How the Company" />
                  <br />
                  <SplitText text="Evolved" className="accent" delay={0.2} />
                </h2>
              </div>
            </ParallaxLayer>
            <ParallaxLayer speed={0.1}>
              <TiltCard className="about-evolution-card">
                <p className="about-evolution-intro">
                  The company started as a specialized engineering unit focused on modern data centers (MDC), cloud integrations, and automation frameworks. As businesses demanded deeper resilience and smarter systems, we expanded into:
                </p>
                <div className="about-services-list">
                  {aboutServicesExpanded.map((service, i) => (
                    <div key={i} className="about-service-item">
                      <span className="about-check-icon"><Icon name="check" /></span>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
                <p className="about-evolution-closing">
                  Today, Infiniti Tech Partners operates as a <span className="font-semibold text-white">full-stack technology engineering firm</span>, supporting clients who require dependable, scalable, and secure solutions — from startups building their first core architecture to enterprises upgrading legacy systems into modern ecosystems.
                </p>
              </TiltCard>
            </ParallaxLayer>
          </div>

          {/* What Drives Us */}
          <div className="page-section">
            <ParallaxLayer speed={-0.2}>
              <div className="section-header">
                <h2 className="section-title">
                  <SplitText text="What" />
                  <br />
                  <SplitText text="Drives Us" className="accent" delay={0.2} />
                </h2>
              </div>
            </ParallaxLayer>
            <ParallaxLayer speed={0.1}>
              <TiltCard className="about-quote-card">
                <p className="about-motto">"{aboutMotto}"</p>
              </TiltCard>
            </ParallaxLayer>
            <div className="about-principles-grid">
              <p className="about-principles-intro">Our teams operate with:</p>
              {aboutOperatingPrinciples.map((principle, i) => (
                <ParallaxLayer key={i} speed={0.1 + i * 0.02}>
                  <div className="about-principle-item">
                    <span className="about-principle-dot" />
                    <span>{principle}</span>
                  </div>
                </ParallaxLayer>
              ))}
            </div>
            <ParallaxLayer speed={0.1}>
              <p className="about-drives-closing">
                This ensures our clients get solutions that are <span className="font-semibold text-white">resilient, efficient, and ready for the next decade</span> — not just the next quarter.
              </p>
            </ParallaxLayer>
          </div>

          {/* Why Clients Work With Us */}
          <div className="page-section">
            <ParallaxLayer speed={-0.2}>
              <div className="section-header">
                <h2 className="section-title">
                  <SplitText text="Why Clients" />
                  <br />
                  <SplitText text="Work With Us" className="accent" delay={0.2} />
                </h2>
                <p className="page-description" style={{ marginTop: '30px' }}>
                  Not because of geography. Not because of cost.
                  <br />
                  <span style={{ color: 'var(--color-primary)' }}>Because we deliver technology that performs.</span>
                </p>
              </div>
            </ParallaxLayer>
            <div className="features-grid">
              {aboutClientReasons.map((reason, i) => (
                <ParallaxLayer key={i} speed={0.1 + i * 0.03}>
                  <TiltCard className="feature-card about-reason-card">
                    <span className="feature-icon"><Icon name="award" /></span>
                    <p className="feature-desc">{reason.text}</p>
                  </TiltCard>
                </ParallaxLayer>
              ))}
            </div>
          </div>

          {/* Vision & Commitment */}
          <div className="page-section">
            <div className="about-vision-grid">
              <ParallaxLayer speed={0.1}>
                <TiltCard className="about-vision-card">
                  <div className="about-vision-icon">
                    <Icon name="zap" />
                  </div>
                  <h3 className="about-vision-title">Our Vision</h3>
                  <p className="about-vision-text">{aboutVision}</p>
                </TiltCard>
              </ParallaxLayer>
              <ParallaxLayer speed={0.12}>
                <TiltCard className="about-commitment-card">
                  <div className="about-commitment-icon">
                    <Icon name="shield" />
                  </div>
                  <h3 className="about-commitment-title">Our Commitment</h3>
                  <p className="about-vision-text">{aboutCommitment}</p>
                </TiltCard>
              </ParallaxLayer>
            </div>
            <ParallaxLayer speed={0.1}>
              <div className="about-closing-card">
                <p className="about-closing-text">
                  {aboutClosingStatement.split("advantage").map((part, i) =>
                    i === 0 ? (
                      <span key={i}>{part}<span className="text-gradient">advantage</span></span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </p>
              </div>
            </ParallaxLayer>
          </div>

          {/* CTA */}
          <div className="page-section page-cta-section">
            <ParallaxLayer speed={0.1}>
              <div className="page-cta-content">
                <h2 className="page-cta-title">Ready to work with us?</h2>
                <p className="page-cta-desc">
                  Let's discuss how we can help transform your business.
                </p>
                <MagneticButton href="/contact" className="btn-primary large">
                  Get in Touch
                </MagneticButton>
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
