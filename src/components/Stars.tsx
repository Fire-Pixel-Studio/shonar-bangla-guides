
import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
}

const Stars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const numStars = window.innerWidth < 768 ? 15 : 30;
      
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 2 + 1,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
        });
      }
      
      setStars(newStars);
    };

    generateStars();
    
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white dark:bg-bengal-300 opacity-30 dark:opacity-20 rotate-star"
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
  );
};

export default Stars;
