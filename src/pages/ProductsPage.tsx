import { PageLayout } from "@/components/common/PageLayout";
import { ParallaxLayer, TiltCard, MagneticButton } from "@/components/ui";
import { products } from "@/data/siteData";

export const ProductsPage = () => {
  return (
    <PageLayout
      tag="Our Products"
      title="Production-Ready"
      titleAccent="Enterprise Solutions"
      description="Battle-tested software products ready to deploy and scale with your business."
    >
      <div className="section-container">
        <div className="page-section">
          <div className="products-grid-full">
            {products.map((product, i) => (
              <ParallaxLayer key={i} speed={0.08 + (i % 2) * 0.06}>
                <TiltCard className="product-card-full">
                  <div
                    className="product-visual-full"
                    style={{ background: product.gradient }}
                  >
                    <div className="product-icon-3d">
                      <div className="cube">
                        <div className="cube-face front" />
                        <div className="cube-face back" />
                        <div className="cube-face right" />
                        <div className="cube-face left" />
                        <div className="cube-face top" />
                        <div className="cube-face bottom" />
                      </div>
                    </div>
                  </div>
                  <div className="product-content-full">
                    <span className="product-tagline">{product.tagline}</span>
                    <h3 className="product-name-large">{product.name}</h3>
                    <p className="product-desc-full">{product.desc}</p>
                    <div className="product-features-full">
                      {product.features.map((f, j) => (
                        <span key={j} className="feature-tag">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="product-actions">
                      <MagneticButton href="/contact" className="btn-primary">
                        Request Demo
                      </MagneticButton>
                      <MagneticButton href="/contact" className="btn-secondary">
                        Learn More
                      </MagneticButton>
                    </div>
                  </div>
                </TiltCard>
              </ParallaxLayer>
            ))}
          </div>
        </div>

        <div className="page-section page-cta-section">
          <ParallaxLayer speed={0.1}>
            <div className="page-cta-content">
              <h2 className="page-cta-title">Interested in our products?</h2>
              <p className="page-cta-desc">
                Schedule a demo to see how our solutions can benefit your business.
              </p>
              <MagneticButton href="/contact" className="btn-primary large">
                Schedule Demo
              </MagneticButton>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </PageLayout>
  );
};
