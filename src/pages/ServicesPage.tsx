import { PageLayout } from "@/components/common/PageLayout";
import { ParallaxLayer, TiltCard, MagneticButton } from "@/components/ui";
import { services } from "@/data/siteData";

export const ServicesPage = () => {
  return (
    <PageLayout
      tag="Our Services"
      title="Comprehensive"
      titleAccent="Technology Solutions"
      description="End-to-end technology services designed to accelerate your digital transformation journey."
    >
      <div className="section-container">
        <div className="page-section">
          <div className="services-grid-full">
            {services.map((service, i) => (
              <ParallaxLayer key={i} speed={0.08 + (i % 3) * 0.04}>
                <TiltCard className="service-card-full">
                  <div className="service-header">
                    <div className="service-icon-large">{service.icon}</div>
                    <h3 className="service-title-large">{service.title}</h3>
                  </div>
                  <p className="service-desc-full">{service.desc}</p>
                  <div className="service-features-section">
                    <h4 className="service-features-title">Key Features</h4>
                    <ul className="service-features-list">
                      {service.features.map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <MagneticButton href="/contact" className="service-cta-btn">
                    Learn More
                    <svg viewBox="0 0 24 24" className="btn-arrow">
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </MagneticButton>
                </TiltCard>
              </ParallaxLayer>
            ))}
          </div>
        </div>

        <div className="page-section page-cta-section">
          <ParallaxLayer speed={0.1}>
            <div className="page-cta-content">
              <h2 className="page-cta-title">Need a custom solution?</h2>
              <p className="page-cta-desc">
                We can tailor our services to meet your specific requirements.
              </p>
              <MagneticButton href="/contact" className="btn-primary large">
                Contact Us
              </MagneticButton>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </PageLayout>
  );
};
