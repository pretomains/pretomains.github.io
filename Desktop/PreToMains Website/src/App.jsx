import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedSection } from './components/FeaturedSection';
import { CatalogGrid } from './components/CatalogGrid';
import { ProductModal } from './components/ProductModal';
import { initialProducts } from './data/sampleProducts';
import { fetchGoogleSheetData, DEFAULT_SHEET_URL } from './utils/sheetParser';

export function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load Google Sheet data on mount (defaults to hardcoded user sheet)
  useEffect(() => {
    fetchGoogleSheetData(DEFAULT_SHEET_URL)
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn('Failed to load sheet data, using fallback data:', err);
      });
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
              Empowering government exam aspirants with structured, concise, and high-yield revision materials for UPSC, SSC, Banking, Railways, State PCS, Defense & All Government Exams.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
              Syllabus & Exam Coverage
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
              Key Study Resources
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.8 }}>
              <li>✔ High-Yield Revision PDFs & Mindmaps</li>
              <li>✔ Topic-wise Solved PYQs</li>
              <li>✔ Exam Specific Practice Frameworks</li>
              <li>✔ Instant Free Digital PDF Downloads</li>
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
            &copy; {new Date().getFullYear()} PreToMains Notes & Materials. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Designed for All Government Exams Preparation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

