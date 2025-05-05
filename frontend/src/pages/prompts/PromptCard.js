import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiCopy, FiArrowRight } from 'react-icons/fi';

const PromptCard = ({
  id,
  title,
  description,
  category,
  tags = [],
  likes = 0,
  views = 0,
  className = '',
  isDetailed = false,
  promptText = '',
  onLike,
  onCopy,
  ...props
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    if (onCopy) onCopy(id);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLike) onLike(id);
  };

  // For the detailed view with full prompt text
  if (isDetailed) {
    return (
      <motion.div
        className={`glass rounded-lg p-6 border border-light-300/10 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-neo text-caption">{category}</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-light-300 text-body-sm">
                <FiEye className="mr-1" />
                {views}
              </span>
              <button 
                onClick={handleLike} 
                className="flex items-center text-light-300 hover:text-primary transition-colors text-body-sm"
              >
                <FiHeart className="mr-1" />
                {likes}
              </button>
            </div>
          </div>
          <h2 className="text-heading text-light-100 mb-2">{title}</h2>
          <p className="text-light-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-body-sm bg-dark-800 px-3 py-1 rounded-full text-light-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <motion.button
              onClick={handleCopy}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-800 text-light-300 hover:bg-neo hover:text-dark-900 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiCopy />
            </motion.button>
          </div>
          <div className="bg-dark-800 p-4 rounded-lg font-mono text-light-200 whitespace-pre-wrap">
            {promptText}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default card for listings
  return (
    <motion.div
      className={`glass rounded-lg overflow-hidden h-full flex flex-col border border-light-300/10 ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <Link to={`/prompts/${id}`} className="flex flex-col h-full">
        <div className="p-6 flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-neo text-caption">{category}</span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center text-light-300 text-body-sm">
                <FiEye className="mr-1" />
                {views}
              </span>
              <span className="flex items-center text-light-300 text-body-sm">
                <FiHeart className="mr-1" />
                {likes}
              </span>
            </div>
          </div>
          <h3 className="text-subheading text-light-100 mb-2">{title}</h3>
          <p className="text-light-300 mb-4 line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="text-body-sm bg-dark-800 px-3 py-1 rounded-full text-light-300"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-body-sm bg-dark-800 px-3 py-1 rounded-full text-light-300">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
        <div className="p-4 border-t border-dark-700 flex justify-between items-center mt-auto">
          <span className="text-light-100 text-body-sm font-medium">View Prompt</span>
          <motion.span 
            className="text-neo"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <FiArrowRight />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
};

export default PromptCard;