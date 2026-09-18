import React, { useState } from 'react';
import { X, Download, Flame, ExternalLink, Share2, Check, FileText } from 'lucide-react';

export const ProductModal = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const isFree = Number(product.Price_in_rupees) === 0;
  const isFeatured = String(product.featured).toUpperCase() === 'TRUE';

  const productUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(product.Product_id)}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(productUrl);
    } else {
      const input = document.createElement('input');
      input.value = productUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} style={{ color: '#DC2626' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748B', fontFamily: 'monospace' }}>
              PRODUCT ID: {product.Product_id}
            </span>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '0.25rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              alignItems: 'start'
            }}
          >
            {/* Image Box */}
            <div 
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: '#F1F5F9',
                border: '1px solid #E2E8F0',
                position: 'relative',
                maxHeight: '320px'
              }}
            >
              <img 
                src={product.Image_Link} 
                alt={product.Product_Title} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {isFeatured && (
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <span className="badge badge-featured">
                    <Flame size={12} />
                    Featured Material
                  </span>
                </div>
              )}
            </div>

            {/* Details Box */}
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#09090B', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                {product.Product_Title}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: isFree ? '#10B981' : '#09090B' }}>
                  {isFree ? 'FREE' : `₹${product.Price_in_rupees}`}
                </div>

                {!isFree && (
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                    Instant Digital Access
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#09090B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                  Description & Coverage
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {product.Product_Description}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a 
                  href={product.download_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <Download size={18} />
                  <span>{isFree ? 'Download PDF Now' : `Access Material (₹${product.Price_in_rupees})`}</span>
                  <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.7 }} />
                </a>

                <button 
                  className="btn btn-outline"
                  onClick={handleShare}
                  style={{ width: '100%' }}
                >
                  {copied ? <Check size={16} style={{ color: '#10B981' }} /> : <Share2 size={16} />}
                  <span>{copied ? 'Direct Link Copied!' : 'Share Direct Product URL'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
