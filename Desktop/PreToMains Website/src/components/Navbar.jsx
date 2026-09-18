import React from 'react';
import { Search, Sparkles } from 'lucide-react';

export const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Top Header Row: Logo & Category Badges */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            width: '100%',
            gap: '0.75rem'
          }}
        >
          {/* Brand Logo */}
          <a href="#" className="brand-logo">
            <img 
              src="https://yt3.googleusercontent.com/kJ-tV8mWZjWLC7NT7Uauo5Mz224IflmxTVNXVjWQ8LZ9PfDA9QyIuv1oGZe76CL50oVaT8jY8aA=s72-c-k-c0x00ffffff-no-rj" 
              alt="PreToMains Logo"
              onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
              }}
            />
            <div>
              <div className="brand-text-title">PreToMains</div>
              <div className="brand-text-sub">Notes & Materials</div>
            </div>
          </a>

          {/* Right Resource Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'nowrap' }}>
            <span 
              className="badge badge-red-outline" 
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', textTransform: 'none', fontWeight: 700 }}
            >
              <Sparkles size={12} />
              <span>All Government Exams Portal</span>
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div style={{ width: '100%', maxWidth: '540px', position: 'relative' }}>
          <Search 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '14px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#94A3B8' 
            }} 
          />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '2.6rem', paddingRight: '1rem', height: '42px', fontSize: '0.9rem' }}
            placeholder="Search UPSC, SSC, Banking, Railways, PYQs or Product ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};
