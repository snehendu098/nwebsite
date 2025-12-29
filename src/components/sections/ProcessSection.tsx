import { ParallaxLayer, SplitText, TiltCard } from "@/components/ui";
import { processSteps } from "@/data/data";

export const ProcessSection = () => {
  return (
    <section id="process" className="process">
      <div className="section-container">
        <ParallaxLayer speed={-0.2}>
          <div className="section-header">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">
              <SplitText text="Our Proven" />
              <br />
              <SplitText text="Methodology" className="accent" delay={0.2} />
            </h2>
          </div>
        </ParallaxLayer>

        <div className="process-timeline">
          {processSteps.map((step, i) => (
            <ParallaxLayer key={i} speed={0.08 + i * 0.03}>
              <div className="process-step">
                <div className="step-marker">
                  <span className="step-num">{step.num}</span>
                  <div className="step-line" />
                </div>
                <TiltCard className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                  <ul className="step-points">
                    {step.points.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </TiltCard>
              </div>
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
};
