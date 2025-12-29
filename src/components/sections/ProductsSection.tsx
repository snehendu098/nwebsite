import { ParallaxLayer, SplitText, TiltCard, MagneticButton } from "@/components/ui";
import { products } from "@/data/data";

export const ProductsSection = () => {
  return (
    <section id="products" className="products">
      <div className="section-container">
        <ParallaxLayer speed={-0.2}>
          <div className="section-header">
            <span className="section-tag">Our Products</span>
            <h2 className="section-title">
              <SplitText text="Production-Ready" />
              <br />
              <SplitText text="Enterprise Solutions" className="accent" delay={0.2} />
            </h2>
          </div>
        </ParallaxLayer>

        <div className="products-showcase">
          {products.map((product, i) => (
            <ParallaxLayer key={i} speed={0.1 + (i % 2) * 0.08}>
              <TiltCard className="product-card">
                <div className="product-visual" style={{ background: product.gradient }}>
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
                <div className="product-content">
                  <span className="product-tagline">{product.tagline}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-desc">{product.desc}</p>
                  <div className="product-features">
                    {product.features.map((f, j) => (
                      <span key={j} className="feature-tag">
                        {f}
                      </span>
                    ))}
                  </div>
                  <MagneticButton href="#contact" className="product-cta">
                    Learn More
                  </MagneticButton>
                </div>
              </TiltCard>
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
};
