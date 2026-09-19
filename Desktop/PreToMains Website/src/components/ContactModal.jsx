import React from 'react';
import { X, Mail, User, ShieldCheck, Send, MessageSquare, Video } from 'lucide-react';


export const ContactModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
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
            <Mail size={22} style={{ color: '#DC2626' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#09090B' }}>
              Contact PreToMains
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
        <div style={{ padding: '1.5rem', color: '#334155', lineHeight: 1.6 }}>
          <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '1.5rem' }}>
            Have questions regarding our study materials, PDF downloads, or notes requests? Reach out directly to our management and team:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
            {/* Managed By Email Card */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ padding: '0.65rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-md)', color: '#DC2626' }}>
                  <User size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Managed By
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', marginTop: '2px' }}>
                    Akash Kumar
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', fontFamily: 'monospace' }}>
                    akashkumar60907@gmail.com
                  </div>
                </div>
              </div>

              <a 
                href="mailto:akashkumar60907@gmail.com?subject=PreToMains%20Website%20Inquiry"
                className="btn btn-outline btn-sm"
                style={{ flexShrink: 0 }}
              >
                <Send size={14} />
                <span>Email</span>
              </a>
            </div>

            {/* Channel Owner Email Card */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #FCA5A5',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 4px 12px rgba(220,38,38,0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ padding: '0.65rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-md)', color: '#DC2626' }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Channel Owner
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', marginTop: '2px' }}>
                    PreToMains Official
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', fontFamily: 'monospace' }}>
                    sofficial72@gmail.com
                  </div>
                </div>
              </div>

              <a 
                href="mailto:sofficial72@gmail.com?subject=PreToMains%20Channel%20Official%20Inquiry"
                className="btn btn-primary btn-sm"
                style={{ flexShrink: 0 }}
              >
                <Send size={14} />
                <span>Email Owner</span>
              </a>
            </div>
          </div>

          {/* Additional Info Box */}
          <div 
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.15rem',
              fontSize: '0.85rem',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <Video size={20} style={{ color: '#DC2626', flexShrink: 0 }} />
            <div>
              Connect with us on YouTube at <strong>@pretomains</strong> for daily video updates, exam analysis, and PDF discussion sessions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
