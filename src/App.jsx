import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';

// ============================================
// INFINITITECH PARTNERS - REDESIGNED WEBSITE
// Three.js + Particles + Locomotive + ReactBits
// ============================================

// ==========================================
// UTILITY HOOKS
// ==========================================

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  
  return position;
};

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return [ref, inView];
};

// ==========================================
// THREE.JS PARTICLE FIELD BACKGROUND
// ==========================================

const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouse = useMousePosition();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 0.5;
        this.speedZ = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.5 ? '#00ffcc' : '#ff6b35';
      }
      
      update() {
        this.z -= this.speedZ;
        if (this.z <= 0) this.reset();
        
        // Mouse influence
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
        }
      }
      
      draw() {
        const scale = 1000 / (1000 + this.z);
        const x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = this.size * scale;
        const alpha = scale * 0.8;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < 300; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(8, 12, 21, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [mouse]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

// ==========================================
// AURORA BACKGROUND (ReactBits Inspired)
// ==========================================

const AuroraBackground = () => (
  <div className="aurora-container">
    <div className="aurora aurora-1" />
    <div className="aurora aurora-2" />
    <div className="aurora aurora-3" />
  </div>
);

// ==========================================
// SPLIT TEXT ANIMATION (ReactBits)
// ==========================================

const SplitText = ({ text, className = '', delay = 0 }) => {
  const [ref, inView] = useInView(0.3);
  const words = text.split(' ');
  
  return (
    <span ref={ref} className={`split-text ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrapper">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={`split-char ${inView ? 'animate' : ''}`}
              style={{
                animationDelay: `${delay + (wordIndex * 0.1) + (charIndex * 0.03)}s`
              }}
            >
              {char}
            </span>
          ))}
          <span>&nbsp;</span>
        </span>
      ))}
    </span>
  );
};

// ==========================================
// BLUR TEXT ANIMATION
// ==========================================

const BlurText = ({ text, className = '', delay = 0 }) => {
  const [ref, inView] = useInView(0.3);
  
  return (
    <span ref={ref} className={`blur-text ${className} ${inView ? 'in-view' : ''}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="blur-char"
          style={{ animationDelay: `${delay + i * 0.02}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

// ==========================================
// MAGNETIC BUTTON (ReactBits)
// ==========================================

const MagneticButton = ({ children, href = '#', className = '' }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };
  
  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });
  
  return (
    <a
      ref={buttonRef}
      href={href}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <span className="magnetic-button-inner">{children}</span>
      <span className="magnetic-button-glow" />
    </a>
  );
};

// ==========================================
// TILT CARD (3D Effect)
// ==========================================

const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (y - 0.5) * -20;
    const rotateY = (x - 0.5) * 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({ x: x * 100, y: y * 100 });
  };
  
  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
  };
  
  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      <div
        className="tilt-card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
        }}
      />
      {children}
    </div>
  );
};

// ==========================================
// ANIMATED COUNTER
// ==========================================

const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * end));
        
        if (progress < 1) requestAnimationFrame(animate);
      };
      
      animate();
    }
  }, [inView, end, duration]);
  
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// ==========================================
// SCROLL PROGRESS
// ==========================================

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="scroll-progress">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

// ==========================================
// CUSTOM CURSOR
// ==========================================

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const leave = () => setHidden(true);
    
    const checkHover = () => {
      const hoverable = document.querySelectorAll('a, button, .tilt-card, .magnetic-button');
      hoverable.forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };
    
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    setTimeout(checkHover, 100);
    
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);
  
  return (
    <>
      <div
        className={`custom-cursor ${hidden ? 'hidden' : ''} ${hovered ? 'hovered' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
      <div
        className={`custom-cursor-dot ${hidden ? 'hidden' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
    </>
  );
};

// ==========================================
// NAVIGATION
// ==========================================

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' }
  ];
  
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          <span className="logo-symbol">∞</span>
          <span className="logo-text">Infinititech</span>
        </a>
        
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <MagneticButton href="#contact" className="nav-cta">
          Let's Talk
        </MagneticButton>
        
        <button
          className={`nav-mobile-toggle ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

// ==========================================
// HERO SECTION
// ==========================================

const HeroSection = () => (
  <section id="home" className="hero">
    <AuroraBackground />
    
    <div className="hero-content">
      <div className="hero-badge">
        <span className="badge-dot" />
        <span>Leading Technology Partner</span>
      </div>
      
      <h1 className="hero-title">
        <SplitText text="Transform" className="hero-line" />
        <SplitText text="Innovate &" className="hero-line accent" delay={0.3} />
        <SplitText text="Scale" className="hero-line" delay={0.6} />
      </h1>
      
      <p className="hero-subtitle">
        <BlurText
          text="Data Center Management • Custom Software • Smart City Solutions • Digital Services"
          delay={1}
        />
      </p>
      
      <div className="hero-ctas">
        <MagneticButton href="#contact" className="btn-primary">
          Start Your Project
          <svg viewBox="0 0 24 24" className="btn-arrow">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </MagneticButton>
        <MagneticButton href="#services" className="btn-secondary">
          Explore Services
        </MagneticButton>
      </div>
      
      <div className="hero-scroll">
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </div>
    
    <div className="hero-visual">
      <div className="hero-sphere" />
      <div className="hero-ring ring-1" />
      <div className="hero-ring ring-2" />
      <div className="hero-ring ring-3" />
    </div>
  </section>
);

// ==========================================
// ABOUT SECTION
// ==========================================

const AboutSection = () => {
  const [ref, inView] = useInView(0.2);
  
  const values = [
    { icon: '⚡', title: 'Our Mission', desc: 'Empower businesses with cutting-edge technology solutions that drive growth and digital transformation.' },
    { icon: '🔭', title: 'Our Vision', desc: 'Be the most trusted technology partner globally, known for excellence and innovation.' },
    { icon: '💎', title: 'Our Values', desc: 'Integrity, Innovation, Excellence, and Customer-Centricity guide everything we do.' }
  ];
  
  const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered' },
    { value: 30, suffix: '+', label: 'Happy Clients' },
    { value: 4, suffix: '', label: 'Team Members' },
    { value: 6, suffix: '', label: 'Services Offered' }
  ];
  
  return (
    <section id="about" className="about" ref={ref}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">About Us</span>
          <h2 className="section-title">
            <SplitText text="Bridging Technology" />
            <br />
            <SplitText text="& Business Needs" className="accent" delay={0.3} />
          </h2>
        </div>
        
        <div className="about-content">
          <div className="about-intro">
            <p className={`about-text ${inView ? 'animate' : ''}`}>
              Founded with a vision to bridge the gap between innovative technology 
              and real-world business needs, we combine technical expertise with 
              business acumen to deliver transformative solutions.
            </p>
          </div>
          
          <div className="about-values">
            {values.map((value, i) => (
              <TiltCard key={i} className="value-card">
                <span className="value-icon">{value.icon}</span>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </TiltCard>
            ))}
          </div>
          
          <div className="about-stats">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SERVICES SECTION
// ==========================================

const ServicesSection = () => {
  const services = [
    {
      icon: '🏢',
      title: 'Data Center Management',
      desc: 'Enterprise-grade data center solutions with 24/7 monitoring and optimal performance.',
      features: ['Infrastructure Design', 'Power Management', 'Cooling Systems', 'Security']
    },
    {
      icon: '🔧',
      title: 'Custom MDC Software',
      desc: 'Tailored modular data center software solutions for your specific needs.',
      features: ['DCIM Solutions', 'Asset Tracking', 'Capacity Planning', 'Analytics']
    },
    {
      icon: '🌆',
      title: 'Smart City Solutions',
      desc: 'IoT-powered urban infrastructure for smarter, more efficient cities.',
      features: ['Traffic Management', 'Smart Lighting', 'Waste Management', 'Air Quality']
    },
    {
      icon: '💼',
      title: 'CRM, ERP & POS',
      desc: 'Complete enterprise software suite for seamless business operations.',
      features: ['Sales Automation', 'Inventory', 'HR Management', 'Reporting']
    },
    {
      icon: '📱',
      title: 'Web & Mobile Development',
      desc: 'Cross-platform digital experiences that engage and convert.',
      features: ['React/Next.js', 'React Native', 'Progressive Web Apps', 'API Development']
    },
    {
      icon: '📈',
      title: 'Digital Marketing',
      desc: 'Data-driven growth strategies to maximize your online presence.',
      features: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics']
    }
  ];
  
  return (
    <section id="services" className="services">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">What We Do</span>
          <h2 className="section-title">
            <SplitText text="Comprehensive" />
            <br />
            <SplitText text="Technology Solutions" className="accent" delay={0.2} />
          </h2>
        </div>
        
        <div className="services-grid">
          {services.map((service, i) => (
            <TiltCard key={i} className="service-card">
              <div className="service-icon">{service.icon}</div>
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
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// PRODUCTS SECTION
// ==========================================

const ProductsSection = () => {
  const products = [
    {
      name: 'Marketplace',
      tagline: 'B2B Commodity Trading',
      desc: 'Enterprise B2B marketplace with tokenization, escrow payments, and blockchain integration.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Tokenization', 'Escrow Payments', 'Blockchain', 'Multi-currency']
    },
    {
      name: 'Accubooks',
      tagline: 'Enterprise Accounting',
      desc: 'Multi-tenant accounting with double-entry bookkeeping, inventory, HR & payroll.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['Double-entry', 'Multi-tenant', 'Payroll', 'Inventory']
    },
    {
      name: 'School ERP',
      tagline: 'School Management',
      desc: 'Complete school management covering admissions, academics, fees, and transport.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      features: ['Admissions', 'Academics', 'Fees', 'Transport']
    },
    {
      name: 'Fleet Management',
      tagline: 'Enterprise Telematics',
      desc: 'Real-time GPS tracking, ELD compliance, driver management, and analytics.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      features: ['GPS Tracking', 'ELD Compliance', 'Driver Mgmt', 'Analytics']
    }
  ];
  
  return (
    <section id="products" className="products">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Our Products</span>
          <h2 className="section-title">
            <SplitText text="Production-Ready" />
            <br />
            <SplitText text="Enterprise Solutions" className="accent" delay={0.2} />
          </h2>
        </div>
        
        <div className="products-showcase">
          {products.map((product, i) => (
            <TiltCard key={i} className="product-card">
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
                    <span key={j} className="feature-tag">{f}</span>
                  ))}
                </div>
                <MagneticButton href="#contact" className="product-cta">
                  Learn More
                </MagneticButton>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// PORTFOLIO SECTION
// ==========================================

const PortfolioSection = () => {
  const projects = [
    {
      category: 'Smart City',
      title: 'Smart City Dashboard',
      desc: 'Real-time urban monitoring system for efficient city management',
      tech: ['React', 'Node.js', 'IoT'],
      gradient: 'linear-gradient(135deg, #00ffcc 0%, #00ccff 100%)'
    },
    {
      category: 'Enterprise Software',
      title: 'Enterprise CRM Platform',
      desc: 'Custom CRM solution for manufacturing industry',
      tech: ['Next.js', 'PostgreSQL', 'Redis'],
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #ff9f1c 100%)'
    },
    {
      category: 'Data Center',
      title: 'Data Center Monitor',
      desc: 'Comprehensive MDC management dashboard',
      tech: ['Vue.js', 'Python', 'Docker'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  ];
  
  return (
    <section id="portfolio" className="portfolio">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Our Work</span>
          <h2 className="section-title">
            <SplitText text="Featured" />
            <br />
            <SplitText text="Projects" className="accent" delay={0.2} />
          </h2>
        </div>
        
        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <TiltCard key={i} className="portfolio-card">
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
                    <span key={j} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
        
        <div className="portfolio-cta">
          <MagneticButton href="#contact" className="btn-primary">
            View All Projects
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// PROCESS SECTION
// ==========================================

const ProcessSection = () => {
  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'We get on a Teams call to understand your business module, end users, user personas, and your unique value proposition.',
      points: ['Business Analysis', 'User Research', 'Problem Definition', 'USP Identification']
    },
    {
      num: '02',
      title: 'Scope of Work',
      desc: 'Comprehensive project planning with clear timelines, milestones, and success criteria.',
      points: ['Timeline Planning', 'Milestone Definition', 'Acceptance Criteria', 'Tech Stack']
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Iterative design process ensuring your vision comes to life perfectly.',
      points: ['UI/UX Design', 'Prototype Creation', 'Design Reviews', 'Final Approval']
    },
    {
      num: '04',
      title: 'Development',
      desc: 'Agile development with regular updates and quality assurance at every step.',
      points: ['Sprint Planning', 'CI/CD', 'Code Reviews', 'Testing']
    },
    {
      num: '05',
      title: 'Deployment',
      desc: 'Smooth launch and ongoing support to ensure your success.',
      points: ['Production Deploy', 'Monitoring', 'Training', 'Maintenance']
    }
  ];
  
  return (
    <section id="process" className="process">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">How We Work</span>
          <h2 className="section-title">
            <SplitText text="Our Proven" />
            <br />
            <SplitText text="Methodology" className="accent" delay={0.2} />
          </h2>
        </div>
        
        <div className="process-timeline">
          {steps.map((step, i) => (
            <div key={i} className="process-step">
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
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// TEAM SECTION
// ==========================================

const TeamSection = () => {
  const team = [
    { name: 'Sudipto Mitra', role: 'Founder & Lead Developer', avatar: 'SM' },
    { name: 'Pallabi Datta', role: 'HR Manager', avatar: 'PD' },
    { name: 'Snehendu Roy', role: 'Full-stack MERN Developer', avatar: 'SR' },
    { name: 'Soumyadip Chanda', role: 'AI/ML Developer', avatar: 'SC' }
  ];
  
  return (
    <section id="team" className="team">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Our Team</span>
          <h2 className="section-title">
            <SplitText text="Meet The" />
            <br />
            <SplitText text="Experts" className="accent" delay={0.2} />
          </h2>
        </div>
        
        <div className="team-grid">
          {team.map((member, i) => (
            <TiltCard key={i} className="team-card">
              <div className="team-avatar">
                <span>{member.avatar}</span>
                <div className="avatar-glow" />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <div className="team-socials">
                <a href="#" className="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// CONTACT / CTA SECTION
// ==========================================

const ContactSection = () => (
  <section id="contact" className="contact">
    <div className="contact-glow glow-1" />
    <div className="contact-glow glow-2" />
    
    <div className="section-container">
      <div className="contact-content">
        <span className="section-tag">Get Started</span>
        <h2 className="contact-title">
          <SplitText text="Ready to Transform" />
          <br />
          <SplitText text="Your Business?" className="accent" delay={0.2} />
        </h2>
        <p className="contact-desc">
          Let's discuss your project and bring your vision to life with cutting-edge technology solutions.
        </p>
        
        <div className="contact-actions">
          <MagneticButton href="mailto:hello@infinititechpartners.com" className="btn-primary large">
            Get in Touch
            <svg viewBox="0 0 24 24" className="btn-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </MagneticButton>
        </div>
        
        <div className="contact-email">
          <a href="mailto:hello@infinititechpartners.com">hello@infinititechpartners.com</a>
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// FOOTER
// ==========================================

const Footer = () => {
  const links = {
    main: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Portfolio', href: '#portfolio' }
    ],
    secondary: [
      { label: 'Products', href: '#products' },
      { label: 'Team', href: '#team' },
      { label: 'Contact', href: '#contact' }
    ]
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <span className="logo-symbol">∞</span>
              <span className="logo-text">Infinititech Partners</span>
            </a>
            <p className="footer-tagline">
              Transform your digital vision into reality with cutting-edge technology solutions.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                {links.main.map((link, i) => (
                  <li key={i}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>More</h4>
              <ul>
                {links.secondary.map((link, i) => (
                  <li key={i}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Infinititech Partners. All rights reserved.</p>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN APP
// ==========================================

const InfinititechWebsite = () => {
  return (
    <div className="app">
      <style>{`
        /* ========================================
           CSS VARIABLES & BASE STYLES
           ======================================== */
        
        :root {
          --color-bg: #080c15;
          --color-bg-elevated: #0d1117;
          --color-bg-card: #161b22;
          --color-primary: #00ffcc;
          --color-secondary: #ff6b35;
          --color-accent: #667eea;
          --color-text: #e6edf3;
          --color-text-muted: #8b949e;
          --color-border: rgba(255, 255, 255, 0.1);
          
          --font-display: 'Clash Display', 'SF Pro Display', system-ui, sans-serif;
          --font-body: 'Satoshi', 'SF Pro Text', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
          
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
          --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
        }
        
        @font-face {
          font-family: 'Clash Display';
          src: url('https://fonts.cdnfonts.com/css/clash-display') format('truetype');
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body, .app {
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-body);
          line-height: 1.6;
          overflow-x: hidden;
          cursor: none;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        ::selection {
          background: var(--color-primary);
          color: var(--color-bg);
        }
        
        /* ========================================
           CUSTOM CURSOR
           ======================================== */
        
        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid var(--color-primary);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
          z-index: 10000;
        }
        
        .custom-cursor.hidden { opacity: 0; }
        .custom-cursor.hovered {
          width: 60px;
          height: 60px;
          border-color: var(--color-secondary);
        }
        
        .custom-cursor-dot {
          position: fixed;
          width: 6px;
          height: 6px;
          background: var(--color-primary);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 10001;
          transition: opacity 0.3s;
        }
        
        .custom-cursor-dot.hidden { opacity: 0; }
        
        /* ========================================
           SCROLL PROGRESS
           ======================================== */
        
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .scroll-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
          transition: width 0.1s;
        }
        
        /* ========================================
           NAVIGATION
           ======================================== */
        
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 20px 40px;
          transition: all 0.4s var(--ease-out-expo);
        }
        
        .nav.scrolled {
          background: rgba(8, 12, 21, 0.9);
          backdrop-filter: blur(20px);
          padding: 15px 40px;
          border-bottom: 1px solid var(--color-border);
        }
        
        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.5rem;
        }
        
        .logo-symbol {
          font-size: 2rem;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        
        .nav-link {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          transition: color 0.3s;
          position: relative;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-primary);
          transition: width 0.3s var(--ease-out-expo);
        }
        
        .nav-link:hover {
          color: var(--color-text);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-cta {
          padding: 10px 24px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-bg);
        }
        
        .nav-mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
        }
        
        .nav-mobile-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--color-text);
          transition: all 0.3s;
        }
        
        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .nav-mobile-toggle { display: flex; }
          .nav-links.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-bg-elevated);
            padding: 20px;
            gap: 20px;
          }
        }
        
        /* ========================================
           AURORA BACKGROUND
           ======================================== */
        
        .aurora-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .aurora {
          position: absolute;
          width: 150%;
          height: 150%;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          animation: aurora-drift 20s ease-in-out infinite;
        }
        
        .aurora-1 {
          top: -50%;
          left: -25%;
          background: radial-gradient(circle, var(--color-primary) 0%, transparent 60%);
          animation-delay: 0s;
        }
        
        .aurora-2 {
          top: 0;
          right: -25%;
          background: radial-gradient(circle, var(--color-secondary) 0%, transparent 60%);
          animation-delay: -7s;
        }
        
        .aurora-3 {
          bottom: -50%;
          left: 25%;
          background: radial-gradient(circle, var(--color-accent) 0%, transparent 60%);
          animation-delay: -14s;
        }
        
        @keyframes aurora-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(5%, 5%) scale(1.1); }
          50% { transform: translate(-5%, 10%) scale(0.9); }
          75% { transform: translate(10%, -5%) scale(1.05); }
        }
        
        /* ========================================
           SPLIT TEXT ANIMATION
           ======================================== */
        
        .split-text {
          display: inline;
        }
        
        .word-wrapper {
          display: inline-block;
        }
        
        .split-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(100%) rotateX(-90deg);
          transform-origin: bottom center;
          transition: none;
          color: inherit;
        }

        .split-char.animate {
          animation: char-reveal 0.8s var(--ease-out-expo) forwards;
        }

        @keyframes char-reveal {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }
        
        /* ========================================
           BLUR TEXT ANIMATION
           ======================================== */
        
        .blur-text .blur-char {
          display: inline-block;
          opacity: 0;
          filter: blur(10px);
          transform: translateY(20px);
        }
        
        .blur-text.in-view .blur-char {
          animation: blur-reveal 0.6s var(--ease-out-expo) forwards;
        }
        
        @keyframes blur-reveal {
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
        
        /* ========================================
           MAGNETIC BUTTON
           ======================================== */
        
        .magnetic-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 100px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-text);
          cursor: pointer;
          transition: transform 0.15s ease-out;
          overflow: hidden;
        }
        
        .magnetic-button-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .magnetic-button-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .magnetic-button:hover .magnetic-button-glow {
          opacity: 1;
        }
        
        .magnetic-button:hover {
          color: var(--color-bg);
          border-color: transparent;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          color: var(--color-bg);
          border: none;
        }
        
        .btn-primary .magnetic-button-glow {
          background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
        }
        
        .btn-primary.large {
          padding: 20px 48px;
          font-size: 1.1rem;
        }
        
        .btn-arrow {
          width: 20px;
          height: 20px;
          transition: transform 0.3s;
        }
        
        .magnetic-button:hover .btn-arrow {
          transform: translateX(5px);
        }
        
        /* ========================================
           TILT CARD
           ======================================== */
        
        .tilt-card {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out;
          will-change: transform;
        }
        
        .tilt-card-glare {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 10;
        }
        
        /* ========================================
           SECTION STYLES
           ======================================== */
        
        .section-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        
        .section-header {
          margin-bottom: 80px;
          text-align: center;
        }
        
        .section-tag {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(0, 255, 204, 0.1);
          border: 1px solid rgba(0, 255, 204, 0.3);
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        
        .split-text.accent {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }

        .split-text.accent .split-char {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .section-title .accent {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }

        .section-title .accent .split-char {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        
        /* ========================================
           HERO SECTION
           ======================================== */
        
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 120px 40px 80px;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1000px;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          border-radius: 100px;
          font-size: 0.9rem;
          margin-bottom: 40px;
          animation: fade-up 1s var(--ease-out-expo) 0.2s both;
        }
        
        .badge-dot {
          width: 8px;
          height: 8px;
          background: var(--color-primary);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 30px;
        }
        
        .hero-line {
          display: block;
        }
        
        .hero-line.accent {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: block;
        }

        .hero-line.accent .split-char {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        
        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--color-text-muted);
          margin-bottom: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-ctas {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fade-up 1s var(--ease-out-expo) 1.5s both;
        }
        
        .hero-scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          animation: fade-up 1s var(--ease-out-expo) 2s both;
        }
        
        .scroll-indicator {
          width: 24px;
          height: 40px;
          border: 2px solid var(--color-border);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }
        
        .scroll-dot {
          width: 4px;
          height: 8px;
          background: var(--color-primary);
          border-radius: 2px;
          animation: scroll-bounce 2s infinite;
        }
        
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.3; }
        }
        
        .hero-visual {
          position: absolute;
          right: -200px;
          top: 50%;
          transform: translateY(-50%);
          width: 600px;
          height: 600px;
          pointer-events: none;
        }
        
        .hero-sphere {
          position: absolute;
          inset: 100px;
          background: radial-gradient(circle at 30% 30%, var(--color-primary), var(--color-accent), var(--color-bg));
          border-radius: 50%;
          opacity: 0.3;
          animation: sphere-pulse 8s ease-in-out infinite;
        }
        
        .hero-ring {
          position: absolute;
          border: 1px solid rgba(0, 255, 204, 0.2);
          border-radius: 50%;
          animation: ring-rotate 20s linear infinite;
        }
        
        .ring-1 { inset: 50px; animation-duration: 20s; }
        .ring-2 { inset: 80px; animation-duration: 25s; animation-direction: reverse; }
        .ring-3 { inset: 110px; animation-duration: 30s; }
        
        @keyframes sphere-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        
        @keyframes ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* ========================================
           ABOUT SECTION
           ======================================== */
        
        .about {
          padding: 150px 0;
          position: relative;
        }
        
        .about-content {
          display: grid;
          gap: 80px;
        }
        
        .about-intro {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .about-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: var(--color-text-muted);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s var(--ease-out-expo);
        }
        
        .about-text.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .about-values {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .value-card {
          padding: 40px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 24px;
        }
        
        .value-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          display: block;
        }
        
        .value-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .value-desc {
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        
        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          padding: 60px;
          background: linear-gradient(135deg, rgba(0, 255, 204, 0.1), rgba(102, 126, 234, 0.1));
          border: 1px solid var(--color-border);
          border-radius: 24px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .stat-label {
          display: block;
          margin-top: 10px;
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }
        
        @media (max-width: 768px) {
          .about-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* ========================================
           SERVICES SECTION
           ======================================== */
        
        .services {
          padding: 150px 0;
          background: var(--color-bg-elevated);
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }
        
        .service-card {
          padding: 40px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          transition: border-color 0.3s;
        }
        
        .service-card:hover {
          border-color: var(--color-primary);
        }
        
        .service-icon {
          font-size: 3rem;
          margin-bottom: 25px;
        }
        
        .service-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .service-desc {
          color: var(--color-text-muted);
          margin-bottom: 25px;
          line-height: 1.7;
        }
        
        .service-features {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 25px;
        }
        
        .service-features li {
          padding: 6px 14px;
          background: rgba(0, 255, 204, 0.1);
          border-radius: 100px;
          font-size: 0.85rem;
          color: var(--color-primary);
        }
        
        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: var(--color-primary);
          transition: gap 0.3s;
        }
        
        .service-link:hover {
          gap: 15px;
        }
        
        .link-arrow {
          width: 18px;
          height: 18px;
        }
        
        /* ========================================
           PRODUCTS SECTION
           ======================================== */
        
        .products {
          padding: 150px 0;
        }
        
        .products-showcase {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        
        .product-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          overflow: hidden;
        }
        
        .product-visual {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .product-icon-3d {
          perspective: 200px;
        }
        
        .cube {
          width: 60px;
          height: 60px;
          position: relative;
          transform-style: preserve-3d;
          animation: cube-rotate 10s linear infinite;
        }
        
        .cube-face {
          position: absolute;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .front { transform: translateZ(30px); }
        .back { transform: translateZ(-30px) rotateY(180deg); }
        .right { transform: translateX(30px) rotateY(90deg); }
        .left { transform: translateX(-30px) rotateY(-90deg); }
        .top { transform: translateY(-30px) rotateX(90deg); }
        .bottom { transform: translateY(30px) rotateX(-90deg); }
        
        @keyframes cube-rotate {
          from { transform: rotateX(0) rotateY(0); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        .product-content {
          padding: 30px;
        }
        
        .product-tagline {
          display: block;
          font-size: 0.85rem;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        
        .product-name {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .product-desc {
          color: var(--color-text-muted);
          margin-bottom: 20px;
          line-height: 1.7;
        }
        
        .product-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 25px;
        }
        
        .feature-tag {
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          border-radius: 100px;
          font-size: 0.8rem;
        }
        
        .product-cta {
          padding: 12px 24px;
          font-size: 0.9rem;
        }
        
        /* ========================================
           PORTFOLIO SECTION
           ======================================== */
        
        .portfolio {
          padding: 150px 0;
          background: var(--color-bg-elevated);
        }
        
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        
        .portfolio-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          overflow: hidden;
        }
        
        .portfolio-image {
          height: 200px;
          position: relative;
        }
        
        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }
        
        .portfolio-category {
          padding: 6px 14px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 100px;
          font-size: 0.85rem;
        }
        
        .portfolio-content {
          padding: 30px;
        }
        
        .portfolio-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .portfolio-desc {
          color: var(--color-text-muted);
          margin-bottom: 20px;
        }
        
        .portfolio-tech {
          display: flex;
          gap: 8px;
        }
        
        .tech-tag {
          padding: 5px 12px;
          background: rgba(0, 255, 204, 0.1);
          border-radius: 100px;
          font-size: 0.8rem;
          color: var(--color-primary);
        }
        
        .portfolio-cta {
          text-align: center;
        }
        
        /* ========================================
           PROCESS SECTION
           ======================================== */
        
        .process {
          padding: 150px 0;
        }
        
        .process-timeline {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .process-step {
          display: flex;
          gap: 40px;
          margin-bottom: 40px;
        }
        
        .step-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 60px;
          flex-shrink: 0;
        }
        
        .step-num {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: 50%;
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--color-bg);
        }
        
        .step-line {
          flex: 1;
          width: 2px;
          background: var(--color-border);
          margin-top: 10px;
        }
        
        .process-step:last-child .step-line {
          display: none;
        }
        
        .step-content {
          flex: 1;
          padding: 30px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 20px;
        }
        
        .step-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .step-desc {
          color: var(--color-text-muted);
          margin-bottom: 20px;
          line-height: 1.7;
        }
        
        .step-points {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .step-points li {
          padding: 6px 14px;
          background: rgba(0, 255, 204, 0.1);
          border-radius: 100px;
          font-size: 0.85rem;
          color: var(--color-primary);
        }
        
        /* ========================================
           TEAM SECTION
           ======================================== */
        
        .team {
          padding: 150px 0;
          background: var(--color-bg-elevated);
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        
        .team-card {
          padding: 40px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          text-align: center;
        }
        
        .team-avatar {
          width: 100px;
          height: 100px;
          margin: 0 auto 25px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-bg);
          position: relative;
        }
        
        .avatar-glow {
          position: absolute;
          inset: -10px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: 50%;
          opacity: 0.3;
          filter: blur(20px);
          z-index: -1;
        }
        
        .team-name {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .team-role {
          color: var(--color-text-muted);
          margin-bottom: 20px;
        }
        
        .team-socials {
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          border-radius: 50%;
          transition: all 0.3s;
        }
        
        .social-link:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-bg);
        }
        
        .social-link svg {
          width: 18px;
          height: 18px;
        }
        
        /* ========================================
           CONTACT SECTION
           ======================================== */
        
        .contact {
          padding: 200px 0;
          position: relative;
          overflow: hidden;
        }
        
        .contact-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(150px);
          opacity: 0.3;
        }
        
        .glow-1 {
          top: -200px;
          left: -200px;
          background: var(--color-primary);
        }
        
        .glow-2 {
          bottom: -200px;
          right: -200px;
          background: var(--color-secondary);
        }
        
        .contact-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .contact-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 30px;
        }
        
        .contact-desc {
          font-size: 1.2rem;
          color: var(--color-text-muted);
          margin-bottom: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .contact-actions {
          margin-bottom: 40px;
        }
        
        .contact-email a {
          font-size: 1.3rem;
          color: var(--color-primary);
          transition: color 0.3s;
        }
        
        .contact-email a:hover {
          color: var(--color-secondary);
        }
        
        /* ========================================
           FOOTER
           ======================================== */
        
        .footer {
          padding: 80px 0 40px;
          background: var(--color-bg-elevated) !important;
          border-top: 3px solid var(--color-primary) !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
          position: relative !important;
          z-index: 50 !important;
          margin-top: 0 !important;
          pointer-events: auto !important;
          min-height: 200px !important;
        }
        
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          opacity: 1 !important;
        }
        
        .footer-main {
          display: flex;
          justify-content: space-between;
          gap: 60px;
          margin-bottom: 60px;
          opacity: 1 !important;
        }

        .footer-brand {
          max-width: 400px;
          opacity: 1 !important;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.3rem;
          margin-bottom: 20px;
          color: var(--color-text) !important;
          opacity: 1 !important;
        }

        .footer-tagline {
          color: var(--color-text-muted) !important;
          line-height: 1.7;
          opacity: 1 !important;
        }

        .footer-links {
          display: flex;
          gap: 80px;
          opacity: 1 !important;
        }
        
        .footer-col h4 {
          font-family: var(--font-display);
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--color-text) !important;
          opacity: 1 !important;
        }

        .footer-col ul {
          list-style: none;
          opacity: 1 !important;
        }

        .footer-col li {
          margin-bottom: 12px;
          opacity: 1 !important;
        }

        .footer-col a {
          color: var(--color-text-muted) !important;
          transition: color 0.3s;
          opacity: 1 !important;
        }
        
        .footer-col a:hover {
          color: var(--color-primary);
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 0.9rem;
          opacity: 1 !important;
        }

        .footer-legal {
          display: flex;
          gap: 30px;
          opacity: 1 !important;
        }

        .footer-legal a {
          color: var(--color-text-muted) !important;
          opacity: 1 !important;
        }

        .footer-legal a:hover {
          color: var(--color-primary);
        }
        
        @media (max-width: 768px) {
          .footer-main {
            flex-direction: column;
          }
          
          .footer-links {
            gap: 40px;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }
      `}</style>
      
      <ParticleField />
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <PortfolioSection />
        <ProcessSection />
        <TeamSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default InfinititechWebsite;
