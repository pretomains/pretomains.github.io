import React from 'react';
import { X, ShieldAlert, Video, HardDrive, ShoppingBag, Info, ExternalLink } from 'lucide-react';

export const DisclaimerModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0',
            position: 'sticky',
            top: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldAlert size={22} style={{ color: '#DC2626' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#09090B' }}>
              Disclaimer & Disclosures
            </h3>
          </div>

          <button 
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: '#F1F5F9',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', color: '#334155', lineHeight: 1.6, fontSize: '0.9rem' }}>
          
          {/* Section 1: Content Ownership */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#09090B', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Video size={18} style={{ color: '#DC2626' }} />
              <span>1. Content Ownership & Copyright</span>
            </h4>
            <p style={{ color: '#475569', margin: 0 }}>
              All study materials, revision PDF guides, mindmaps, formula books, and curated content listed on this website are owned and created by the <strong>@pretomains</strong> YouTube Channel and team. Unauthorized duplication, re-selling, or redistribution without prior permission is strictly prohibited.
            </p>
          </div>

          {/* Section 2: External Google Drive Storage */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#09090B', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HardDrive size={18} style={{ color: '#DC2626' }} />
              <span>2. External Google Drive Link References</span>
            </h4>
            <p style={{ color: '#475569', margin: 0 }}>
              All PDF download buttons and material resources linked on this platform refer to external files hosted on <strong>Google Drive</strong> cloud storage. We do not store executable files or malicious code. Users are redirected safely to view or download materials via Google Drive sharing protocols.
            </p>
          </div>

          {/* Section 3: Affiliate Links Disclosure */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#09090B', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={18} style={{ color: '#DC2626' }} />
              <span>3. Amazon Affiliate Links Disclosure</span>
            </h4>
            <p style={{ color: '#475569', margin: 0 }}>
              This platform participates in affiliate referral marketing programs, including the <strong>Amazon Services LLC Associates Program</strong>. Certain recommended book links or preparation materials may contain affiliate links. If you purchase products through these referral links, PreToMains may earn a small affiliate commission at <strong>no extra cost to you</strong>. This helps support the creation of free study materials for exam aspirants.
            </p>
          </div>

          {/* Section 4: Educational Purpose Disclaimer */}
          <div 
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.15rem',
              color: '#991B1B',
              fontSize: '0.85rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              <Info size={16} />
              <span>Educational & Non-Official Notice</span>
            </div>
            <div>
              PreToMains is an independent educational platform for exam aspirants. We are not directly affiliated with or endorsed by any official government recruiting body (such as UPSC, SSC, IBPS, or RRB). Official exam notifications should always be cross-checked on official government web portals.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
