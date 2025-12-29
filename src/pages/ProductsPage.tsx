import { Link } from "react-router-dom";
import { PageLayout } from "@/components/common/PageLayout";
import { FloatingConstellation } from "@/components/effects";
import { TiltCard, MagneticButton, Icon, type IconName } from "@/components/ui";
import { products } from "@/data/data";

export const ProductsPage = () => {
  return (
    <>
      <FloatingConstellation name="cygnus" />
      <PageLayout
        tag="Our Products"
        title="Production-Ready"
        titleAccent="Enterprise Solutions"
        description="Production-ready enterprise solutions built with modern technologies—ready to deploy and scale."
      >
        <div className="section-container">
          <div className="page-section">
            <div className="products-grid-full">
              {products.map((product, i) => (
                <TiltCard key={i} className="product-card-full">
                  <Link to={`/products/${product.slug}`} className="product-card-link">
                    <div
                      className="product-visual-full"
                      style={{ background: product.gradient }}
                    >
                      <div className="product-icon-wrapper">
                        <Icon name={product.icon as IconName} size={48} />
                      </div>
                      <span className="product-category">{product.category}</span>
                    </div>
                    <div className="product-content-full">
                      <span className="product-tagline">{product.tagline}</span>
                      <h3 className="product-name-large">{product.name}</h3>
                      <p className="product-desc-full">{product.desc}</p>

                      <div className="product-tech-stack">
                        {product.technologies.map((tech, j) => (
                          <span key={j} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="product-highlights">
                        <span className="highlights-label">Highlights</span>
                        <p className="highlights-text">{product.highlights}</p>
                      </div>

                      <div className="product-features-full">
                        {product.features.map((f, j) => (
                          <span key={j} className="feature-tag">
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="product-view-details">
                        View Product Details
                        <svg viewBox="0 0 24 24" className="arrow-icon">
                          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>

          <div className="page-section page-cta-section">
            <div className="page-cta-content">
              <h2 className="page-cta-title">Ready to Transform Your Business?</h2>
              <p className="page-cta-desc">
                Our products are production-ready and can be customized to fit your specific needs.
              </p>
              <MagneticButton href="/contact" className="btn-primary large">
                Get in Touch
              </MagneticButton>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
