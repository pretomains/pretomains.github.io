import React from 'react';
import { Download, Eye, Video } from 'lucide-react';
import { PdfIconCardHeader } from './PdfIconCardHeader';

export const ProductCard = ({ product, onSelectProduct }) => {
  const isFree = Number(product.Price_in_rupees) === 0;
  const isFeatured = String(product.featured).toUpperCase() === 'TRUE';

  return (
    <div 
      className="hover-lift"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Top PDF Icon Header */}
      <PdfIconCardHeader
        product={product}
        isFeatured={isFeatured}
        isFree={isFree}
        onSelectProduct={onSelectProduct}
        height="185px"
      />

      {/* Content Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#09090B',
            marginBottom: '0.5rem',
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
            fontSize: '0.85rem',
            color: '#64748B',
            lineHeight: 1.5,
            marginBottom: '1.25rem',
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => onSelectProduct(product)}
            >
              <Eye size={14} />
              <span>Details</span>
            </button>

            <a 
              href={product.download_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
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
};
