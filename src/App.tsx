import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParticleField, ScrollProgress, CustomCursor } from "@/components/effects";
import { Navigation, Footer } from "@/components/common";
import {
  HomePage,
  AboutPage,
  ServicesPage,
  ProductsPage,
  PortfolioPage,
  ProcessPage,
  TeamPage,
  ContactPage,
} from "@/pages";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <ParticleField />
        <ScrollProgress />
        <CustomCursor />
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
