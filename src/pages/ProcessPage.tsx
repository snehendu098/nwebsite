import { PageLayout } from "@/components/common/PageLayout";
import { FloatingConstellation } from "@/components/effects";
import { ParallaxLayer, TiltCard, MagneticButton } from "@/components/ui";
import { processSteps } from "@/data/data";

export const ProcessPage = () => {
  return (
    <>
      <FloatingConstellation name="cygnus" />
      <PageLayout
        tag="How We Work"
        title="Our Proven"
        titleAccent="Methodology"
        description="A structured approach to delivering exceptional results for every project."
      >
        <div className="section-container">
          <div className="page-section">
            <div className="process-timeline-full">
              {processSteps.map((step, i) => (
                <ParallaxLayer key={i} speed={0.06 + i * 0.02}>
                  <div className="process-step-full">
                    <div className="step-marker-full">
                      <span className="step-num-large">{step.num}</span>
                      <div className="step-line-full" />
                    </div>
                    <TiltCard className="step-content-full">
                      <h3 className="step-title-large">{step.title}</h3>
                      <p className="step-desc-full">{step.desc}</p>
                      <div className="step-details">
                        <h4 className="step-details-title">What we do:</h4>
                        <ul className="step-points-full">
                          {step.points.map((p, j) => (
                            <li key={j}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    </TiltCard>
                  </div>
                </ParallaxLayer>
              ))}
            </div>
          </div>

          <div className="page-section page-cta-section">
            <ParallaxLayer speed={0.1}>
              <div className="page-cta-content">
                <h2 className="page-cta-title">Ready to start your journey?</h2>
                <p className="page-cta-desc">
                  Let's discuss how our process can help bring your project to life.
                </p>
                <MagneticButton href="/contact" className="btn-primary large">
                  Get Started
                </MagneticButton>
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
