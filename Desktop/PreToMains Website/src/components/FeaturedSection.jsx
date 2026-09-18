import React from 'react';
import { Flame, ArrowRight, Download, Video } from 'lucide-react';
import { PdfIconCardHeader } from './PdfIconCardHeader';

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
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Handpicked top-recommended study guides for Government Exams</p>
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
              <PdfIconCardHeader
                product={item}
                isFeatured={true}
                isFree={isFree}
                onSelectProduct={onSelectProduct}
                height="195px"
              />

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#09090B', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {item.Product_Title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {item.Product_Description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
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

                  {item.Video_URL && item.Video_URL.trim() !== '' && item.Video_URL !== '#' && (
                    <a 
                      href={item.Video_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm"
                      style={{
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        width: '100%',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontSize: '0.8rem',
                        padding: '0.45rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 2px 8px rgba(220, 38, 38, 0.2)'
                      }}
                    >
                      <Video size={14} />
                      <span>Watch Video</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
