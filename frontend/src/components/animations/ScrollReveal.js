import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({
  children,
  threshold = 0.1,
  triggerOnce = true,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  distance = 50,
  ...props
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  });

  const getDirection = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 };
      case 'right':
        return { x: distance, y: 0 };
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      default:
        return { x: 0, y: distance };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirection(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // cubic bezier easing
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;