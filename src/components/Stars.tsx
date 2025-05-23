
import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';

interface Star {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
  color: string; // Added color property
  speed?: number; // Added speed for running stars
  direction?: string; // Added direction for running stars
}

const Stars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [runningStars, setRunningStars] = useState<Star[]>([]);
  const { theme } = useApp();
  const starsContainerRef = useRef<HTMLDivElement>(null);
  
  // Colors based on theme and requirements
  const starColors = [
    'bg-purple-200/80', // light purple
    'bg-green-200/80',  // light green
    'bg-yellow-200/80', // light gold
    theme === 'light' ? 'bg-black/40' : 'bg-white/80',
  ];
  
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const numStars = window.innerWidth < 768 ? 20 : 40; // Static stars
      
      for (let i = 0; i < numStars; i++) {
        // Randomly select a color from our color array
        const colorIndex = Math.floor(Math.random() * starColors.length);
        
        newStars.push({
          id: i,
          size: Math.random() * 8 + 6, // 3x bigger (was 2-6, now 6-14)
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          color: starColors[colorIndex]
        });
      }
      
      setStars(newStars);
      
      // Generate running stars
      const newRunningStars: Star[] = [];
      const numRunning = 8; // Number of running stars
      
      const directions = ['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'];
      
      for (let i = 0; i < numRunning; i++) {
        const directionIndex = Math.floor(Math.random() * directions.length);
        const direction = directions[directionIndex];
        const colorIndex = Math.floor(Math.random() * starColors.length);
        
        let initialTop = 0, initialLeft = 0;
        
        switch(direction) {
          case 'left-to-right':
            initialLeft = -5;
            initialTop = Math.random() * 100;
            break;
          case 'right-to-left':
            initialLeft = 105;
            initialTop = Math.random() * 100;
            break;
          case 'top-to-bottom':
            initialTop = -5;
            initialLeft = Math.random() * 100;
            break;
          case 'bottom-to-top':
            initialTop = 105;
            initialLeft = Math.random() * 100;
            break;
        }
        
        newRunningStars.push({
          id: numStars + i,
          size: Math.random() * 8 + 6,
          top: initialTop,
          left: initialLeft,
          delay: Math.random() * 2,
          color: starColors[colorIndex],
          speed: Math.random() * 15 + 10, // Speed in seconds
          direction
        });
      }
      
      setRunningStars(newRunningStars);
    };

    generateStars();
    
    const handleResize = () => {
      generateStars();
    };
    
    // Handle scroll effect - stars move in opposite direction of scroll
    const handleScroll = () => {
      if (!starsContainerRef.current) return;
      
      const scrollY = window.scrollY;
      starsContainerRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div ref={starsContainerRef}>
        {/* Static floating stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.color} rotate-star`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              '--delay': star.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Running stars that traverse across the screen */}
      {runningStars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${star.color}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animation: `${star.direction === 'left-to-right' 
              ? 'star-run-left-to-right' 
              : star.direction === 'right-to-left'
                ? 'star-run-right-to-left'
                : star.direction === 'top-to-bottom'
                  ? 'star-run-top-to-bottom'
                  : 'star-run-bottom-to-top'} ${star.speed}s linear infinite`,
            animationDelay: `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Stars;
