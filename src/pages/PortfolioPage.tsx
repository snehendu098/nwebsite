import { PageLayout } from "@/components/common/PageLayout";
import { FloatingConstellation } from "@/components/effects";
import { ParallaxLayer, TiltCard, MagneticButton } from "@/components/ui";
import { projects } from "@/data/data";

export const PortfolioPage = () => {
  return (
    <>
      <FloatingConstellation name="gemini" />
      <PageLayout
        tag="Our Work"
        title="Featured"
        titleAccent="Projects"
        description="Explore our portfolio of successful projects across various industries."
      >
        <div className="section-container">
          <div className="page-section">
            <div className="portfolio-grid-full">
              {projects.map((project, i) => (
                <ParallaxLayer key={i} speed={0.1 + i * 0.03}>
                  <TiltCard className="portfolio-card-full">
                    <div
                      className="portfolio-image-full"
                      style={{ background: project.gradient }}
                    >
                      <div className="portfolio-overlay-full">
                        <span className="portfolio-category-badge">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="portfolio-content-full">
                      <h3 className="portfolio-title-large">{project.title}</h3>
                      <p className="portfolio-desc-full">{project.desc}</p>
                      <div className="portfolio-tech-full">
                        {project.tech.map((t, j) => (
                          <span key={j} className="tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <MagneticButton href="/contact" className="portfolio-view-btn">
                        View Project
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
                  </TiltCard>
                </ParallaxLayer>
              ))}
            </div>
          </div>

          <div className="page-section page-cta-section">
            <ParallaxLayer speed={0.1}>
              <div className="page-cta-content">
                <h2 className="page-cta-title">Have a project in mind?</h2>
                <p className="page-cta-desc">
                  Let's bring your vision to life with our expertise.
                </p>
                <MagneticButton href="/contact" className="btn-primary large">
                  Start Your Project
                </MagneticButton>
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
