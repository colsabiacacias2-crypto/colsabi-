'use client';
import { useEffect, useState, useRef } from 'react';

export default function AnimatedCircularStat({ value, suffix = "", label, icon, percentage = 100, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const statRef = useRef(null);

  // Observador para detectar cuando el elemento entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Retardo en cascada para que no todos inicien exactamente al mismo milisegundo
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Animación del número contando de 0 al valor objetivo
  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = parseInt(value);
      
      if (isNaN(end)) {
        setCount(value);
        return;
      }
      
      const duration = 2000; // 2 segundos de animación
      const increment = end / (duration / 16); // asumiendo ~60fps (16ms por frame)

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  // Cálculos matemáticos para dibujar el círculo SVG y su llenado
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  // Si no es visible, el offset es total (círculo vacío). Si es visible, se llena hasta el porcentaje.
  const strokeDashoffset = isVisible ? circumference - (percentage / 100) * circumference : circumference;

  return (
    <div ref={statRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      
      {/* Contenedor del Círculo SVG y el Texto Interno */}
      <div style={{ position: 'relative', width: '160px', height: '160px', display: 'grid', placeItems: 'center' }}>
        
        {/* SVG rotado -90deg para que el llenado empiece desde arriba (las 12 en punto) */}
        <svg 
          width="160" 
          height="160" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            transform: 'rotate(-90deg)',
            filter: 'drop-shadow(0 0 8px rgba(22, 163, 74, 0.3))' 
          }}
        >
          {/* Círculo de fondo (semitransparente) */}
          <circle 
            cx="80" cy="80" r={radius} 
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" 
          />
          {/* Círculo de progreso (animado) */}
          <circle 
            cx="80" cy="80" r={radius} 
            fill="none" stroke="var(--success)" strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.25, 1, 0.5, 1)' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Contenido centrado dentro del círculo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
          <i className={icon} style={{ fontSize: '1.5rem', color: 'var(--success)', marginBottom: '0.3rem' }}></i>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1', color: '#fff' }}>
            {count}{suffix}
          </span>
        </div>
      </div>

      {/* Etiqueta descriptiva debajo del círculo */}
      <span style={{ 
        fontSize: '1rem', 
        color: 'rgba(255,255,255,0.8)', 
        textTransform: 'uppercase', 
        letterSpacing: '1px', 
        textAlign: 'center', 
        maxWidth: '180px', 
        fontWeight: '500' 
      }}>
        {label}
      </span>
    </div>
  );
}
