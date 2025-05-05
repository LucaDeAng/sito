import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock } from 'react-icons/fi';

const BlogCard = ({
  title,
  excerpt,
  date,
  readTime,
  category,
  image,
  slug,
  variant = 'default', // 'default', 'featured', 'mini'
  className = '',
  ...props
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (variant === 'featured') {
    return (
      <motion.div
        className={`dada-card glass h-full ${className}`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <Link to={`/blog/${slug}`} className="block h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="overflow-hidden h-full">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-8 flex flex-col">
              <span className="text-neo font-mono text-caption mb-3">{category}</span>
              <h3 className="text-heading text-light-100 mb-4 leading-tight">{title}</h3>
              <p className="text-light-300 mb-6 flex-grow">{excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-light-400 text-body-sm">
                  <FiClock className="mr-1" />
                  <span>{readTime} min read</span>
                  <span className="mx-2">•</span>
                  <span>{formattedDate}</span>
                </div>
                <motion.span 
                  className="text-neo"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiArrowRight />
                </motion.span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'mini') {
    return (
      <motion.div
        className={`flex items-start gap-4 ${className}`}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        <Link to={`/blog/${slug}`} className="block flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </Link>
        <div>
          <Link to={`/blog/${slug}`}>
            <h4 className="text-body text-light-100 hover:text-neo transition-colors duration-300">{title}</h4>
          </Link>
          <div className="flex items-center mt-1 text-body-sm text-light-400">
            <FiClock className="mr-1" />
            <span>{readTime} min</span>
            <span className="mx-1">•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default card
  return (
    <motion.div
      className={`dada-card glass h-full flex flex-col ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <Link to={`/blog/${slug}`} className="block h-full flex flex-col">
        <div className="overflow-hidden h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <span className="text-neo font-mono text-caption mb-2">{category}</span>
          <h3 className="text-subheading text-light-100 mb-3">{title}</h3>
          <p className="text-light-300 mb-6 flex-grow">{excerpt}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-light-400 text-body-sm">
              <FiClock className="mr-1" />
              <span>{readTime} min read</span>
            </div>
            <span className="text-light-400 text-body-sm">{formattedDate}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;