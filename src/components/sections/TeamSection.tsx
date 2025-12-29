import { ParallaxLayer, SplitText, TiltCard } from "@/components/ui";
import { team } from "@/data/data";

export const TeamSection = () => {
  return (
    <section id="team" className="team">
      <div className="section-container">
        <ParallaxLayer speed={-0.2}>
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title">
              <SplitText text="Meet The" />
              <br />
              <SplitText text="Experts" className="accent" delay={0.2} />
            </h2>
          </div>
        </ParallaxLayer>

        <div className="team-grid">
          {team.map((member, i) => (
            <ParallaxLayer key={i} speed={0.1 + i * 0.03}>
              <TiltCard className="team-card">
                <div className="team-avatar">
                  <span>{member.avatar}</span>
                  <div className="avatar-glow" />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <div className="team-socials">
                  <a href="#" className="social-link">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </TiltCard>
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
};
