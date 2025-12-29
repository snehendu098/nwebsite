import { ParallaxLayer, SplitText, TiltCard, Icon, type IconName } from "@/components/ui";
import { services } from "@/data/data";

export const ServicesSection = () => {
  return (
    <section id="services" className="services">
      <div className="section-container">
        <ParallaxLayer speed={-0.2}>
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">
              <SplitText text="Comprehensive" />
              <br />
              <SplitText text="Technology Solutions" className="accent" delay={0.2} />
            </h2>
          </div>
        </ParallaxLayer>

        <div className="services-grid">
          {services.map((service, i) => (
            <ParallaxLayer key={i} speed={0.1 + (i % 3) * 0.05}>
              <TiltCard className="service-card">
                <div className="service-icon"><Icon name={service.icon as IconName} /></div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <ul className="service-features">
                  {service.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
                <a href="#contact" className="service-link">
                  Learn More
                  <svg viewBox="0 0 24 24" className="link-arrow">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </a>
              </TiltCard>
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
};
