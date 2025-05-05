import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({
  src,
  alt,
  className = '',
  intensity = 0.1,
  direction = 'down',
  delay = 0,
  ...props
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Define the movement range based on direction and intensity
  let movementRange;
  switch (direction) {
    case 'up':
      movementRange = [-intensity * 100, intensity * 100];
      break;
    case 'down':
      movementRange = [intensity * 100, -intensity * 100];
      break;
    case 'left':
      movementRange = [intensity * 100, -intensity * 100];
      break;
    case 'right':
      movementRange = [-intensity * 100, intensity * 100];
      break;
    default:
      movementRange = [intensity * 100, -intensity * 100];
  }

  // Create transform values based on direction
  const transform = direction === 'left' || direction === 'right'
    ? useTransform(scrollYProgress, [0, 1], movementRange)
    : useTransform(scrollYProgress, [0, 1], movementRange);

  const style = direction === 'left' || direction === 'right'
    ? { x: transform }
    : { y: transform };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} {...props}>
      <motion.img
        src={src}
        alt={alt}
        style={style}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { 
            duration: 1.2,
            delay: delay
          }
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ParallaxImage;