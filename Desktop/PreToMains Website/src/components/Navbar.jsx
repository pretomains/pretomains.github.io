import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';

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
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                flexShrink: 0
              }}
            />
            <div>
              <div className="brand-text-title">PreToMains</div>
              <div className="brand-text-sub">Notes & Materials</div>
            </div>
          </a>

          {/* Right Resource Badges */}
          <div className="navbar-badge-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span 
              className="badge badge-red-outline" 
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.72rem', textTransform: 'none', fontWeight: 700 }}
            >
              <Sparkles size={12} />
              <span>Govt Exams Portal</span>
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
              color: '#94A3B8',
              pointerEvents: 'none'
            }} 
          />
          <input
            type="text"
            className="input-field search-input"
            style={{ 
              paddingLeft: '2.6rem', 
              paddingRight: searchTerm ? '2.5rem' : '1rem', 
              height: '44px', 
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-md)'
            }}
            placeholder="Search notes, PYQs or Product ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

