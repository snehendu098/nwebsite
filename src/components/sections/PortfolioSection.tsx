import { ParallaxLayer, SplitText, TiltCard, MagneticButton } from "@/components/ui";
import { projects } from "@/data/data";

export const PortfolioSection = () => {
  return (
    <section id="portfolio" className="portfolio">
      <div className="section-container">
        <ParallaxLayer speed={-0.2}>
          <div className="section-header">
            <span className="section-tag">Our Work</span>
            <h2 className="section-title">
              <SplitText text="Featured" />
              <br />
              <SplitText text="Projects" className="accent" delay={0.2} />
            </h2>
          </div>
        </ParallaxLayer>

        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <ParallaxLayer key={i} speed={0.12 + i * 0.04}>
              <TiltCard className="portfolio-card">
                <div className="portfolio-image" style={{ background: project.gradient }}>
                  <div className="portfolio-overlay">
                    <span className="portfolio-category">{project.category}</span>
                  </div>
                </div>
                <div className="portfolio-content">
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-desc">{project.desc}</p>
                  <div className="portfolio-tech">
                    {project.tech.map((t, j) => (
                      <span key={j} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </ParallaxLayer>
          ))}
        </div>

        <ParallaxLayer speed={0.15}>
          <div className="portfolio-cta">
            <MagneticButton href="#contact" className="btn-primary">
              View All Projects
            </MagneticButton>
          </div>
        </ParallaxLayer>
      </div>
    </section>
  );
};
