'use client';
import { useState, useEffect } from 'react';

export default function HeroCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-slider reveal-up">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt={img.alt || `Hero slide ${idx + 1}`}
          loading={idx === 0 ? "eager" : "lazy"}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: currentIndex === idx ? 1 : 0,
            transition: 'opacity 1s ease-in-out, transform 5s linear',
            transform: currentIndex === idx ? 'scale(1.05)' : 'scale(1)',
            zIndex: currentIndex === idx ? 2 : 1,
            animation: 'none' // Disable the CSS keyframes animation
          }}
        />
      ))}
    </div>
  );
}
