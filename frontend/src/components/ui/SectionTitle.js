import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const SectionTitle = ({
  title,
  subtitle,
  align = 'center',
  className = '',
  showGlitch = false,
  ...props
}) => {
  const alignmentClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      className={`max-w-3xl mb-12 ${alignmentClasses[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      {...props}
    >
      {subtitle && (
        <h3 className="text-neo font-mono uppercase tracking-wider mb-2">
          {subtitle}
        </h3>
      )}
      <h2 className="text-title text-light-100 font-grotesk leading-tight">
        {showGlitch ? (
          <GlitchText intensity="low">{title}</GlitchText>
        ) : (
          title
        )}
      </h2>
      <div className="mt-4 h-1 w-24 bg-gradient-to-r from-primary via-accent to-neo rounded-full mx-auto" />
    </motion.div>
  );
};

export default SectionTitle;