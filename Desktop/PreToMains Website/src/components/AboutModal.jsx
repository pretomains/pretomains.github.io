import React from 'react';
import { X, Video, BookOpen, Target, Award, PlayCircle, ExternalLink, CheckCircle2 } from 'lucide-react';


export const AboutModal = ({ onClose }) => {
  const sampleChannelVideos = [
    {
      id: "sample1",
      title: "How to Prepare General Studies & Revision Mindmaps | PreToMains",
      url: "https://www.youtube.com/@pretomains",
      duration: "12:45",
      tag: "Strategy Guide"
    },
    {
      id: "sample2",
      title: "SSC CGL & Govt Exams Solved PYQs Breakdown | PDF Notes Included",
      url: "https://www.youtube.com/@pretomains",
      duration: "18:20",
      tag: "PYQ Analysis"
    },
    {
      id: "sample3",
      title: "UPSC & State PCS Prelims High-Yield Revision Framework",
      url: "https://www.youtube.com/@pretomains",
      duration: "15:10",
      tag: "Revision PDF"
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
        {/* Sticky Header */}
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
            <BookOpen size={22} style={{ color: '#DC2626' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#09090B' }}>
              About PreToMains
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
          {/* Channel Banner Box */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #09090B 0%, #18181B 60%, #DC2626 100%)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <img 
                src="https://yt3.googleusercontent.com/kJ-tV8mWZjWLC7NT7Uauo5Mz224IflmxTVNXVjWQ8LZ9PfDA9QyIuv1oGZe76CL50oVaT8jY8aA=s72-c-k-c0x00ffffff-no-rj" 
                alt="PreToMains Logo"
                onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                style={{ width: '54px', height: '54px', borderRadius: '50%', border: '2px solid #FFFFFF' }}
              />
              <div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  PreToMains Official Hub
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#FCA5A5', margin: '2px 0 0 0' }}>
                  Unified Study Material Platform of <strong>@pretomains</strong> YouTube Channel
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#E2E8F0', margin: 0 }}>
              PreToMains is designed to bring all educational study materials, high-yield PDF revision notes, mindmaps, and solved previous year questions (PYQs) into a single, accessible space for government exam aspirants.
            </p>

            <a 
              href="https://www.youtube.com/@pretomains" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
              style={{
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                alignSelf: 'flex-start',
                padding: '0.65rem 1.25rem',
                fontSize: '0.88rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <Video size={18} />
              <span>Visit @pretomains YouTube Channel</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Exam Coverage List */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Target size={18} style={{ color: '#DC2626' }} />
              <span>Comprehensive Exam Coverage</span>
            </h4>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem'
              }}
            >
              {[
                'UPSC CSE & State PCS Prelims & Mains',
                'SSC CGL, CHSL, CPO & Stenographer',
                'Banking (IBPS PO/Clerk, SBI PO/Clerk & RRB)',
                'Railways (RRB NTPC, Group D & ALP)',
                'Defense (NDA, CDS, AFCAT & CAPF)',
                'General Studies, Quant, Reasoning & PYQs'
              ].map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#F8FAFC',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#1E293B'
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Channel Videos Showcase */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090B', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PlayCircle size={18} style={{ color: '#DC2626' }} />
              <span>Featured Channel Videos & Guides</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
              {sampleChannelVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover-lift"
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className="badge badge-red-outline" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                        {video.tag}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'monospace' }}>
                        {video.duration}
                      </span>
                    </div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#09090B', margin: '0 0 0.5rem 0', lineHeight: 1.35 }}>
                      {video.title}
                    </h5>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#DC2626', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.5rem' }}>
                    <PlayCircle size={14} />
                    <span>Watch on YouTube</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
