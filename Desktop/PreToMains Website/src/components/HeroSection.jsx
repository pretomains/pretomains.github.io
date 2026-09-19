import React from 'react';
import { Award, FileText, Download, Sparkles } from 'lucide-react';

export const HeroSection = ({ totalCount, featuredCount, freeCount }) => {
  return (
    <section className="hero-section" style={{ margin: '1rem 0 1.75rem 0' }}>
      <div 
        className="hero-card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
          border: '1px solid #FCA5A5',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 1.25rem',
          boxShadow: '0 10px 30px rgba(220, 38, 38, 0.06)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative background shape */}
        <div 
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FCA5A5',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '0.85rem',
              maxWidth: '100%'
            }}
          >
            <Sparkles size={13} style={{ flexShrink: 0 }} />
            <span>ALL GOVT EXAMS PREPARATION RESOURCE</span>
          </div>

          <h1 
            style={{
              fontSize: 'clamp(1.4rem, 5.5vw, 2.3rem)',
              fontWeight: 800,
              color: '#09090B',
              marginBottom: '0.65rem',
              letterSpacing: '-0.03em',
              lineHeight: '1.25'
            }}
          >
            High-Yield Study Notes & Solved Papers <br className="hero-br" />
            <span style={{ color: '#DC2626' }}>For All Government Exams</span>
          </h1>

          <p 
            style={{
              fontSize: 'clamp(0.88rem, 2.5vw, 1rem)',
              color: '#475569',
              lineHeight: 1.55,
              marginBottom: '1.25rem',
              maxWidth: '680px'
            }}
          >
            Access structured syllabus notes, concise mindmaps, solved papers, and high-yield revision PDF guides crafted for UPSC, SSC, Banking, Railways, State PCS & Defense exams.
          </p>

          <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'center' }}>
            <a href="#catalog" className="btn btn-primary hero-btn" style={{ flex: '1 1 auto', minHeight: '44px' }}>
              <FileText size={18} />
              <span>Explore Materials ({totalCount})</span>
            </a>

            <a href="#catalog" className="btn btn-outline hero-btn" style={{ flex: '1 1 auto', minHeight: '44px', color: '#09090B' }}>
              <Download size={18} style={{ color: '#10B981' }} />
              <span>Free Downloads ({freeCount})</span>
            </a>
          </div>
        </div>

        {/* Statistics bar */}
        <div 
          className="hero-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid #E2E8F0'
          }}
        >
          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-md)', color: '#DC2626', flexShrink: 0 }}>
              <FileText size={18} />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090B', lineHeight: 1 }}>{totalCount}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Materials</div>
            </div>
          </div>

          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-md)', color: '#DC2626', flexShrink: 0 }}>
              <Award size={18} />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090B', lineHeight: 1 }}>{featuredCount}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Featured</div>
            </div>
          </div>

          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#ECFDF5', borderRadius: 'var(--radius-md)', color: '#10B981', flexShrink: 0 }}>
              <Download size={18} />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090B', lineHeight: 1 }}>{freeCount}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Free PDFs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
