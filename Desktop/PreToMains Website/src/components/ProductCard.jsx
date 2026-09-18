import React, { useState } from 'react';
import { Download, ExternalLink, Flame, Eye, Tag, Video } from 'lucide-react';

export const ProductCard = ({ product, onSelectProduct }) => {
  const [imgSrc, setImgSrc] = useState(product.Image_Link);
  const [imgError, setImgError] = useState(false);

  const isFree = Number(product.Price_in_rupees) === 0;
  const isFeatured = String(product.featured).toUpperCase() === 'TRUE';

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      // Fallback high quality document placeholder
      setImgSrc('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80');
    }
  };

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
      {/* Top Media Preview */}
      <div style={{ position: 'relative', height: '190px', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
        <img
          src={imgSrc}
          alt={product.Product_Title}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />

        {/* Featured Tag */}
        {isFeatured && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
            <span className="badge badge-featured">
              <Flame size={12} />
              Featured
            </span>
          </div>
        )}

        {/* Product ID Code Tag (Clickable to copy direct link) */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          title={`Direct link for ${product.Product_id}`}
          style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '12px', 
            backgroundColor: 'rgba(15, 23, 42, 0.88)', 
            color: '#FFFFFF',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-sm)',
            backdropFilter: 'blur(4px)',
            fontFamily: 'monospace',
            border: 'none',
            cursor: 'pointer',
            zIndex: 3
          }}
        >
          {product.Product_id}
        </button>

        {/* Video Available Badge Overlay */}
        {product.Video_URL && product.Video_URL.trim() !== '' && product.Video_URL !== '#' && (
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 2 }}>
            <span 
              className="badge" 
              style={{ backgroundColor: '#DC2626', color: '#FFFFFF', padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
            >
              <Video size={12} />
              Video
            </span>
          </div>
        )}

        {/* Price Tag Overlay */}
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', zIndex: 2 }}>
          {isFree ? (
            <span className="badge badge-free">FREE DOWNLOAD</span>
          ) : (
            <span className="badge badge-price">₹{product.Price_in_rupees}</span>
          )}
        </div>
      </div>

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
