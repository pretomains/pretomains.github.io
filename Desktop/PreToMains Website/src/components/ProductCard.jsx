import React from 'react';
import { Download, Eye, Video, ExternalLink } from 'lucide-react';
import { PdfIconCardHeader } from './PdfIconCardHeader';

export const ProductCard = ({ product, onSelectProduct }) => {
  const isFree = Number(product.Price_in_rupees) === 0;
  const isFeatured = String(product.featured).toUpperCase() === 'TRUE';
  const isAd = Boolean(product.isAd);

  return (
    <div 
      className="product-card hover-lift"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: isAd ? '1.5px solid #F59E0B' : '1px solid #E2E8F0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: isAd ? '0 6px 18px rgba(245, 158, 11, 0.12)' : '0 4px 14px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Top PDF Icon Header */}
      <PdfIconCardHeader
        product={product}
        isFeatured={isFeatured}
        isFree={isFree}
        onSelectProduct={onSelectProduct}
        height="175px"
      />

      {/* Content Body */}
      <div style={{ padding: '1rem 1.15rem 1.15rem 1.15rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#09090B',
            marginBottom: '0.4rem',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.7em'
          }}
        >
          {product.Product_Title}
        </h3>

        <p 
          style={{
            fontSize: '0.82rem',
            color: '#64748B',
            lineHeight: 1.5,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1
          }}
        >
          {product.Product_Description}
        </p>

        {/* Action Row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
          {isAd ? (
            <a 
              href={product.download_link && product.download_link !== '#' ? product.download_link : undefined}
              target={product.download_link && product.download_link !== '#' ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="btn btn-yellow"
              style={{
                width: '100%',
                minHeight: '42px',
                fontSize: '0.9rem',
                justifyContent: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
              onClick={(e) => {
                if (!product.download_link || product.download_link === '#') {
                  e.preventDefault();
                  onSelectProduct(product);
                }
              }}
            >
              <span>View Product</span>
              <ExternalLink size={16} />
            </a>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => onSelectProduct(product)}
                  style={{ minHeight: '40px' }}
                >
                  <Eye size={14} />
                  <span>Details</span>
                </button>

                <a 
                  href={product.download_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ minHeight: '40px' }}
                  onClick={(e) => {
                    if (!product.download_link || product.download_link === '#') {
                      e.preventDefault();
                      onSelectProduct(product);
                    }
                  }}
                >
                  <Download size={14} />
                  <span>{isFree ? 'Download' : 'Get Notes'}</span>
                </a>
              </div>

              {product.Video_URL && product.Video_URL.trim() !== '' && product.Video_URL !== '#' && (
                <a 
                  href={product.Video_URL}
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
                    minHeight: '40px',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.2)'
                  }}
                >
                  <Video size={14} />
                  <span>Watch Video</span>
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
