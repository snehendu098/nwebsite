import { PageLayout } from "@/components/common/PageLayout";
import { ParallaxLayer, TiltCard, AnimatedCounter, MagneticButton } from "@/components/ui";
import { values, stats } from "@/data/siteData";

export const AboutPage = () => {
  return (
    <PageLayout
      tag="About Us"
      title="Bridging Technology"
      titleAccent="& Business Needs"
      description="Founded with a vision to bridge the gap between innovative technology and real-world business needs."
    >
      <div className="section-container">
        <div className="page-section">
          <ParallaxLayer speed={0.1}>
            <div className="about-intro-full">
              <p className="about-text-large">
                We combine technical expertise with business acumen to deliver
                transformative solutions. Our team of experts is dedicated to
                helping businesses thrive in the digital age through innovative
                technology solutions.
              </p>
            </div>
          </ParallaxLayer>
        </div>

        <div className="page-section">
          <h2 className="page-section-title">Our Core Values</h2>
          <div className="about-values">
            {values.map((value, i) => (
              <ParallaxLayer key={i} speed={0.1 + i * 0.05}>
                <TiltCard className="value-card">
                  <span className="value-icon">{value.icon}</span>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-desc">{value.desc}</p>
                </TiltCard>
              </ParallaxLayer>
            ))}
          </div>
        </div>

        <div className="page-section">
          <ParallaxLayer speed={0.15}>
            <div className="about-stats">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-value">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </ParallaxLayer>
        </div>

        <div className="page-section">
          <h2 className="page-section-title">Why Choose Us</h2>
          <div className="features-grid">
            {[
              {
                icon: "🚀",
                title: "Fast Delivery",
                desc: "We deliver projects on time without compromising quality.",
              },
              {
                icon: "🔒",
                title: "Secure Solutions",
                desc: "Security-first approach in all our implementations.",
              },
              {
                icon: "💡",
                title: "Innovation",
                desc: "Cutting-edge technologies and modern approaches.",
              },
              {
                icon: "🤝",
                title: "Partnership",
                desc: "We work as an extension of your team.",
              },
            ].map((feature, i) => (
              <ParallaxLayer key={i} speed={0.1 + i * 0.03}>
                <TiltCard className="feature-card">
                  <span className="feature-icon">{feature.icon}</span>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </TiltCard>
              </ParallaxLayer>
            ))}
          </div>
        </div>

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
  );
};
