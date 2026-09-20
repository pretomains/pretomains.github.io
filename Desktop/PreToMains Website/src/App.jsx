import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedSection } from './components/FeaturedSection';
import { CatalogGrid } from './components/CatalogGrid';
import { ProductModal } from './components/ProductModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { initialProducts } from './data/sampleProducts';
import { fetchGoogleSheetData, DEFAULT_SHEET_URL } from './utils/sheetParser';

export function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'about', 'contact', 'disclaimer', or null
  const [isLoading, setIsLoading] = useState(true);

  // Dark Mode State Management (persists in localStorage)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return false; // Default to light mode (White, Black & Red)
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Load Google Sheet data on mount (defaults to hardcoded user sheet)
  useEffect(() => {
    setIsLoading(true);
    fetchGoogleSheetData(DEFAULT_SHEET_URL)
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn('Failed to load sheet data:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Check URL hash for modal routes e.g., #about, #contact, #disclaimer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about') setActiveModal('about');
      else if (hash === '#contact') setActiveModal('contact');
      else if (hash === '#disclaimer') setActiveModal('disclaimer');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Open product from URL query parameter e.g., ?id=UPS092855
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productIdParam = params.get('id') || params.get('product') || params.get('p');
    if (productIdParam && products.length > 0) {
      const match = products.find(
        (p) => String(p.Product_id).toLowerCase() === String(productIdParam).toLowerCase()
      );
      if (match) {
        setSelectedProduct(match);
      }
    }
  }, [products]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const productIdParam = params.get('id') || params.get('product') || params.get('p');
      if (productIdParam && products.length > 0) {
        const match = products.find(
          (p) => String(p.Product_id).toLowerCase() === String(productIdParam).toLowerCase()
        );
        setSelectedProduct(match || null);
      } else {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  // Handle selecting a product & updating URL
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    if (product) {
      const newUrl = `${window.location.pathname}?id=${encodeURIComponent(product.Product_id)}`;
      window.history.pushState({ id: product.Product_id }, '', newUrl);
    } else {
      const cleanUrl = window.location.pathname;
      window.history.pushState({}, '', cleanUrl);
    }
  };

  // Handle closing modal & resetting URL
  const handleCloseModal = () => {
    setSelectedProduct(null);
    const cleanUrl = window.location.pathname;
    window.history.pushState({}, '', cleanUrl);
  };

  const featuredCount = products.filter(p => String(p.featured).toUpperCase() === 'TRUE').length;
  const freeCount = products.filter(p => Number(p.Price_in_rupees) === 0).length;

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenAbout={() => setActiveModal('about')}
        onOpenContact={() => setActiveModal('contact')}
        onOpenDisclaimer={() => setActiveModal('disclaimer')}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Hero Banner */}
        <HeroSection
          totalCount={products.length}
          featuredCount={featuredCount}
          freeCount={freeCount}
        />

        {/* Featured Showcase */}
        <FeaturedSection
          products={products}
          onSelectProduct={handleSelectProduct}
        />

        {/* All Products Catalog */}
        <CatalogGrid
          products={products}
          searchTerm={searchTerm}
          isLoading={isLoading}
          onSelectProduct={handleSelectProduct}
        />
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      {/* Informational Modals */}
      {activeModal === 'about' && (
        <AboutModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'contact' && (
        <ContactModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'disclaimer' && (
        <DisclaimerModal onClose={() => setActiveModal(null)} />
      )}

      {/* Footer */}
      <footer 
        style={{
          backgroundColor: '#09090B',
          color: '#F8FAFC',
          borderTop: '3px solid #DC2626',
          padding: '3rem 1.5rem 2rem 1.5rem',
          marginTop: 'auto'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <img 
                src="https://yt3.googleusercontent.com/kJ-tV8mWZjWLC7NT7Uauo5Mz224IflmxTVNXVjWQ8LZ9PfDA9QyIuv1oGZe76CL50oVaT8jY8aA=s72-c-k-c0x00ffffff-no-rj" 
                alt="PreToMains Logo"
                onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover'
                }}
              />
              <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                PreToMains Notes & Materials
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6 }}>
              Official study material platform for the <strong>@pretomains</strong> YouTube channel. Empowering government exam aspirants with structured, concise, and high-yield revision PDF notes for UPSC, SSC, Banking, Railways, State PCS & Defense.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
              Exam Coverage
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.8 }}>
              <li>• UPSC CSE & State PCS Prelims/Mains</li>
              <li>• SSC CGL, CHSL & CPO Exam Guides</li>
              <li>• Banking Exams (IBPS, SBI PO & Clerk)</li>
              <li>• Railways & Defense (RRB, NDA, CDS)</li>
              <li>• General Studies, Quant & Reasoning PYQs</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
              Quick Navigation & Pages
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: '#94A3B8', lineHeight: 2.0 }}>
              <li>
                <button onClick={() => setActiveModal('about')} style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  &rarr; About PreToMains
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('contact')} style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  &rarr; Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('disclaimer')} style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  &rarr; Disclaimer & Disclosures
                </button>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ color: '#DC2626', textDecoration: 'none', fontWeight: 700 }}>
                  &rarr; XML Sitemap (sitemap.xml)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingTop: '1.5rem',
            borderTop: '1px solid #27272A',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#71717A'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} PreToMains Notes & Materials. Official Platform of @pretomains YouTube Channel.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={() => setActiveModal('about')} style={{ background: 'none', border: 'none', color: '#71717A', cursor: 'pointer', font: 'inherit' }}>About</button>
            <span>•</span>
            <button onClick={() => setActiveModal('contact')} style={{ background: 'none', border: 'none', color: '#71717A', cursor: 'pointer', font: 'inherit' }}>Contact</button>
            <span>•</span>
            <button onClick={() => setActiveModal('disclaimer')} style={{ background: 'none', border: 'none', color: '#71717A', cursor: 'pointer', font: 'inherit' }}>Disclaimer</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


