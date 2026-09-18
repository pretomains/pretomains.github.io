import React, { useState, useEffect, useRef } from 'react';

export const LazyLoadWrapper = ({ children, minHeight = '280px', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If browser doesn't support IntersectionObserver, render immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        rootMargin: '120px 0px', // Load slightly before coming into viewport
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? (
        children
      ) : (
        /* Skeleton Placeholder while lazy loading */
        <div 
          style={{
            height: minHeight,
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
        >
          <div style={{ height: '180px', backgroundColor: '#F1F5F9' }} />
          <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ height: '18px', width: '75%', backgroundColor: '#E2E8F0', borderRadius: '4px' }} />
            <div style={{ height: '14px', width: '90%', backgroundColor: '#F1F5F9', borderRadius: '4px' }} />
            <div style={{ height: '14px', width: '60%', backgroundColor: '#F1F5F9', borderRadius: '4px' }} />
          </div>
        </div>
      )}
    </div>
  );
};
