import React from 'react';
import { Search, X, Info, Mail, ShieldAlert, Sun, Moon } from 'lucide-react';

export const Navbar = ({ 
  searchTerm, 
  setSearchTerm, 
  isDarkMode, 
  onToggleDarkMode, 
  onOpenAbout, 
  onOpenContact, 
  onOpenDisclaimer 
}) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Top Header Row: Logo & Navigation Badges */}
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

          {/* Right Navigation Links & Badges */}
          <div className="navbar-badge-container" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {/* Dark Mode Toggle Button */}
            <button 
              onClick={onToggleDarkMode}
              className="theme-toggle-btn"
              aria-label="Toggle dark mode"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid',
                borderColor: isDarkMode ? '#DC2626' : '#E2E8F0',
                backgroundColor: isDarkMode ? '#18181B' : '#FFFFFF',
                color: isDarkMode ? '#F8FAFC' : '#09090B',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '32px',
                boxShadow: isDarkMode ? '0 2px 10px rgba(220, 38, 38, 0.25)' : '0 2px 8px rgba(0,0,0,0.05)',
                flexShrink: 0
              }}
            >
              {isDarkMode ? (
                <>
                  <Sun size={14} style={{ color: '#F59E0B' }} />
                  <span className="theme-toggle-label">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={14} style={{ color: '#DC2626' }} />
                  <span className="theme-toggle-label">Dark Mode</span>
                </>
              )}
            </button>

            <button 
              onClick={onOpenAbout}
              className="btn btn-outline btn-sm nav-secondary-btn"
              title="About Us"
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', height: '32px', flexShrink: 0 }}
            >
              <Info size={13} style={{ color: '#DC2626' }} />
              <span className="nav-btn-text">About</span>
            </button>

            <button 
              onClick={onOpenContact}
              className="btn btn-outline btn-sm nav-secondary-btn"
              title="Contact Us"
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', height: '32px', flexShrink: 0 }}
            >
              <Mail size={13} style={{ color: '#DC2626' }} />
              <span className="nav-btn-text">Contact</span>
            </button>

            <button 
              onClick={onOpenDisclaimer}
              className="btn btn-outline btn-sm nav-secondary-btn"
              title="Disclaimer"
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', height: '32px', flexShrink: 0 }}
            >
              <ShieldAlert size={13} style={{ color: '#DC2626' }} />
              <span className="nav-btn-text">Disclaimer</span>
            </button>
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
              height: '42px', 
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


