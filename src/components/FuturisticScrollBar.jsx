// src/components/FuturisticScrollbar.js
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FuturisticScrollbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const position = (window.scrollY / totalHeight) * 100;
      setScrollPosition(position);
      setIsScrolled(window.scrollY > 10); // Match navbar scroll trigger
    };

    window.addEventListener('scroll', updatePosition);
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return (
    <motion.div
      className={`fixed left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-300`}
      style={{
        bottom: isScrolled ? '64px' : '32px', // Adjust based on scroll (64px ≈ 16rem, 32px ≈ 8rem)
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-[50vw] max-w-[600px] h-2 bg-[#112240]/50 rounded-full overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D2D2]/10 via-[#00D2D2]/20 to-[#00D2D2]/10 blur-sm" />
        
        {/* Scroll track */}
        <motion.div
          className="absolute h-full bg-[#00D2D2] rounded-full shadow-[0_0_10px_#00D2D2]"
          style={{ 
            width: `${scrollPosition}%`,
            minWidth: '20px'
          }}
          animate={{
            boxShadow: [
              '0 0 10px #00D2D2',
              '0 0 15px #00D2D2',
              '0 0 10px #00D2D2'
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Glowing end caps */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#00D2D2] rounded-full blur-[2px]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#00D2D2] rounded-full blur-[2px]" />
        </motion.div>

        {/* Hover effect container */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}