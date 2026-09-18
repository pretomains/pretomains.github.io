import React from 'react';
import { Flame, ArrowRight, Download, Sparkles } from 'lucide-react';

export const FeaturedSection = ({ products, onSelectProduct }) => {
  const featuredItems = products.filter(p => String(p.featured).toUpperCase() === 'TRUE');

  if (featuredItems.length === 0) return null;

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ padding: '0.4rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-sm)', color: '#DC2626' }}>
            <Flame size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#09090B' }}>
              Featured Notes & Materials
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Handpicked top-recommended study guides for Prelims & Mains</p>
          </div>
        </div>
      </div>

      <div 
        className="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {featuredItems.map((item) => {
          const isFree = Number(item.Price_in_rupees) === 0;

          return (
            <div
              key={item.Product_id}
              className="hover-lift"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid #FCA5A5',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(220, 38, 38, 0.08)',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', height: '210px', backgroundColor: '#09090B' }}>
                <img
                  src={item.Image_Link}
                  alt={item.Product_Title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                <div 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    padding: '0.3rem 0.7rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  <Sparkles size={12} />
                  <span>HOT FEATURED</span>
                </div>

                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(9, 9, 11, 0.85)',
                    color: '#FFFFFF',
                    padding: '0.35rem 0.8rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {isFree ? 'FREE' : `₹${item.Price_in_rupees}`}
                </div>
              </div>

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626', marginBottom: '0.35rem', fontFamily: 'monospace' }}>
                  ID: {item.Product_id}
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#09090B', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {item.Product_Title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {item.Product_Description}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => onSelectProduct(item)}
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </button>

                  <a 
                    href={item.download_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => {
                      if (!item.download_link || item.download_link === '#') {
                        e.preventDefault();
                        onSelectProduct(item);
                      }
                    }}
                  >
                    <Download size={14} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
