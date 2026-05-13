'use client';
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`to-top ${isVisible ? 'show' : ''}`}
      aria-label="Volver arriba"
      style={{
        position: 'fixed',
        right: '16px',
        bottom: '16px',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        border: 'none',
        background: 'var(--primary)',
        color: '#fff',
        boxShadow: 'var(--shadow)',
        cursor: 'pointer',
        display: isVisible ? 'grid' : 'none',
        placeItems: 'center',
        zIndex: 99
      }}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
