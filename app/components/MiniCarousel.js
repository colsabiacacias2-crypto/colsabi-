'use client';
import { useState, useEffect } from 'react';

export default function MiniCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="mini-carousel" style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      <div 
        className="carousel-track" 
        style={{ 
          display: 'flex', 
          transition: 'transform 0.5s ease-in-out', 
          transform: `translateX(-${currentIndex * 100}%)` 
        }}
      >
        {images.map((img, idx) => (
          <div className="carousel-slide" key={idx} style={{ minWidth: '100%' }}>
            <img 
              loading="lazy" 
              src={img.src} 
              alt={img.alt || `Slide ${idx + 1}`} 
              style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
            />
          </div>
        ))}
      </div>
      <button 
        className="control prev" 
        onClick={prevSlide}
        aria-label="Anterior"
        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10, display: 'grid', placeItems: 'center' }}
      >
        &#10094;
      </button>
      <button 
        className="control next" 
        onClick={nextSlide}
        aria-label="Siguiente"
        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10, display: 'grid', placeItems: 'center' }}
      >
        &#10095;
      </button>
    </div>
  );
}
