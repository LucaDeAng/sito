import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ children, className = '', intensity = 'medium', ...props }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Randomly glitch the text at intervals
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 
    // Random interval based on intensity
    intensity === 'high' ? 
      Math.random() * 2000 + 1000 : 
      intensity === 'medium' ? 
        Math.random() * 4000 + 2000 : 
        Math.random() * 8000 + 4000
    );
    
    return () => clearInterval(glitchInterval);
  }, [intensity]);
  
  const glitchAnimation = {
    hidden: { textShadow: "0 0 0 rgba(0,0,0,0)" },
    glitch: { 
      textShadow: [
        "0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75)",
        "-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)",
        "0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75)",
        "-0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75)",
      ],
      transition: { 
        repeat: 2, 
        repeatType: "mirror", 
        duration: 0.1
      }
    }
  };
  
  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={glitchAnimation}
      animate={isGlitching ? "glitch" : "hidden"}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default GlitchText;