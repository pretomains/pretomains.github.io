import React, { useState } from 'react';
import { FileText, Flame, Video, Tag } from 'lucide-react';

export const PdfIconCardHeader = ({ product, isFeatured, isFree, onSelectProduct, height = '180px' }) => {
  const [imgError, setImgError] = useState(false);
  const hasVideo = product.Video_URL && product.Video_URL.trim() !== '' && product.Video_URL !== '#';
  const isAd = Boolean(product.isAd);

  const hasImage = product.Image_Link && product.Image_Link.trim() !== '' && !imgError;

  return (
    <div 
      style={{ 
        position: 'relative', 
        height: height, 
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #991B1B 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        borderBottom: '1px solid #E2E8F0'
      }}
    >
      {/* Background Image Thumbnail (if available) */}
      {hasImage ? (
        <img
          src={product.Image_Link}
          alt={product.Product_Title || 'Product thumbnail'}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />
      ) : (
        <>
          {/* Decorative Grid Pattern Overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              opacity: 0.6,
              pointerEvents: 'none'
            }}
          />

          {/* Decorative Accent Glow */}
          <div 
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '160px',
              height: '160px',
              background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />

          {/* Center PDF Icon Graphic Unit */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.4rem',
              zIndex: 2,
              transform: 'translateY(-2px)'
            }}
          >
            <div 
              style={{
                position: 'relative',
                width: '62px',
                height: '72px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px 14px 8px 8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #DC2626'
              }}
            >
              {/* Folded Top Corner */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 14px 14px 0',
                  borderColor: 'transparent #991B1B transparent transparent',
                  filter: 'drop-shadow(-1px 1px 1px rgba(0,0,0,0.2))'
                }}
              />

              <FileText size={32} style={{ color: '#DC2626' }} />

              <div 
                style={{
                  marginTop: '4px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '0.6rem',
                  fontWeight: 900,
                  padding: '1px 6px',
                  borderRadius: '3px',
                  letterSpacing: '0.08em',
                  fontFamily: 'monospace'
                }}
              >
                PDF
              </div>
            </div>

            <span 
              style={{ 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                color: '#CBD5E1', 
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginTop: '2px'
              }}
            >
              Digital PDF Document
            </span>
          </div>
        </>
      )}

      {/* Dark overlay gradient when image is displayed */}
      {hasImage && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.65) 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Top Left: Featured & Affiliate Badges */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3, display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
        {isFeatured && (
          <span className="badge badge-featured" style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem' }}>
            <Flame size={12} />
            Featured
          </span>
        )}
        {isAd && (
          <span className="badge badge-affiliate" style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem' }}>
            <Tag size={12} />
            Affiliate
          </span>
        )}
      </div>

      {/* Top Right: Product ID Badge */}
      <button 
        onClick={(e) => {
          if (onSelectProduct) {
            e.stopPropagation();
            onSelectProduct(product);
          }
        }}
        title={`Click to copy direct link for ${product.Product_id}`}
        style={{ 
          position: 'absolute', 
          top: '12px', 
          right: '12px', 
          backgroundColor: 'rgba(15, 23, 42, 0.85)', 
          color: '#F8FAFC',
          fontSize: '0.68rem',
          fontWeight: 700,
          padding: '0.2rem 0.55rem',
          borderRadius: 'var(--radius-sm)',
          backdropFilter: 'blur(4px)',
          fontFamily: 'monospace',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          cursor: onSelectProduct ? 'pointer' : 'default',
          zIndex: 3
        }}
      >
        {product.Product_id}
      </button>

      {/* Bottom Left: Video Badge if present */}
      {hasVideo && (
        <div style={{ position: 'absolute', bottom: '10px', left: '12px', zIndex: 3 }}>
          <span 
            className="badge" 
            style={{ backgroundColor: '#DC2626', color: '#FFFFFF', padding: '0.2rem 0.5rem', fontSize: '0.68rem' }}
          >
            <Video size={11} />
            Video Included
          </span>
        </div>
      )}

      {/* Bottom Right: Price Badge */}
      <div style={{ position: 'absolute', bottom: '10px', right: '12px', zIndex: 3 }}>
        {isFree ? (
          <span className="badge badge-free" style={{ fontSize: '0.7rem' }}>FREE PDF</span>
        ) : (
          <span className="badge badge-price" style={{ fontSize: '0.7rem' }}>₹{product.Price_in_rupees}</span>
        )}
      </div>
    </div>
  );
};
