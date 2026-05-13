import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface GridBackgroundProps {
  color?: string;
  gridSize?: number;
  opacity?: number;
  isVisible?: boolean;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  color = '#ECBD27',
  gridSize = 60,
  opacity = 0.08,
  isVisible = true,
}) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [intersections, setIntersections] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);

      const points = [];
      for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rows; j++) {
          points.push({ x: i * gridSize, y: j * gridSize });
        }
      }
      setIntersections(points);
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, [gridSize]);

  useEffect(() => {
    if (intersections.length === 0) return;

    const ctx = gsap.context(() => {
      const points = containerRef.current?.querySelectorAll('.glow-point');
      if (!points) return;

      points.forEach((point) => {
        const animate = () => {
          // Increase delay and add random skip to make it much more sparse
          const delay = Math.random() * 30 + (Math.random() > 0.5 ? 20 : 0);
          const duration = 2 + Math.random() * 3;
          
          gsap.to(point, {
            opacity: 0.5, // Lower peak opacity too
            scale: 1.2,
            duration: duration,
            delay: delay,
            ease: "sine.inOut",
            onComplete: () => {
              gsap.to(point, {
                opacity: 0,
                scale: 1,
                duration: duration,
                ease: "sine.inOut",
                onComplete: animate
              });
            }
          });
        };
        
        animate();
      });

    }, containerRef);

    return () => ctx.revert();
  }, [intersections]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.to(containerRef.current, {
      opacity: isVisible ? 1 : 0,
      duration: 0.6,
      ease: "power2.inOut"
    });
  }, [isVisible]);



  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      {/* Grid Lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${color} 1px, transparent 1px),
            linear-gradient(to bottom, ${color} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          opacity: opacity,
        }}
      />


      {/* Glow Points */}
      {intersections.map((point, i) => (
        <div
          key={i}
          className="glow-point absolute rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: '4px',
            height: '4px',
            backgroundColor: color,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 10px 2px ${color}`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default GridBackground;
