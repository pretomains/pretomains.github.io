import React from 'react';
import { Award, FileText, Download, Sparkles, Table } from 'lucide-react';

export const HeroSection = ({ totalCount, featuredCount, freeCount, onOpenSheetModal }) => {
  return (
    <section style={{ margin: '1.5rem 0 2rem 0' }}>
      <div 
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
          border: '1px solid #FCA5A5',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 1.5rem',
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
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FCA5A5',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '1rem',
              maxWidth: '100%'
            }}
          >
            <Sparkles size={14} style={{ shrink: 0 }} />
            <span>PRELIMS & MAINS EXAM PREPARATION RESOURCE</span>
          </div>

          <h1 
            style={{
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
              fontWeight: 800,
              color: '#09090B',
              marginBottom: '0.75rem',
              letterSpacing: '-0.03em',
              lineHeight: '1.25'
            }}
          >
            High-Yield Civil Services Study Notes <br />
            <span style={{ color: '#DC2626' }}>& Solved Previous Year Papers (PYQs)</span>
          </h1>

          <p 
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              maxWidth: '680px'
            }}
          >
            Access structured syllabus notes, concise mindmaps, solved GS papers, and high-yield PYQ revision guides crafted specifically for UPSC & State PCS Prelims & Mains success.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <a href="#catalog" className="btn btn-primary" style={{ flex: '1 1 auto', justifyContent: 'center' }}>
              <FileText size={18} />
              <span>Explore Materials ({totalCount})</span>
            </a>

            <a href="#catalog" className="btn btn-outline" style={{ flex: '1 1 auto', justifyContent: 'center', color: '#09090B' }}>
              <Download size={18} style={{ color: '#10B981' }} />
              <span>Free Downloads ({freeCount})</span>
            </a>
          </div>
        </div>

        {/* Statistics bar */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid #E2E8F0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-md)', color: '#DC2626' }}>
              <FileText size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#09090B' }}>{totalCount}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Total Materials</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-md)', color: '#DC2626' }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#09090B' }}>{featuredCount}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Featured Notes</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: '#ECFDF5', borderRadius: 'var(--radius-md)', color: '#10B981' }}>
              <Download size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#09090B' }}>{freeCount}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Free Resources</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

