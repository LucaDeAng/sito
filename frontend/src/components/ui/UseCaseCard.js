import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const UseCaseCard = ({
  title,
  description,
  image,
  slug,
  technologies = [],
  className = '',
  ...props
}) => {
  return (
    <motion.div
      className={`dada-card glass h-full flex flex-col ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <Link to={`/usecases/${slug}`} className="block h-full flex flex-col">
        <div className="overflow-hidden h-56 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-subheading text-light-100 mb-2 text-shadow">{title}</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="text-body-sm bg-dark-800/80 text-neo px-2 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-light-300 mb-6 flex-grow">{description}</p>
          <div className="mt-auto flex justify-between items-center">
            <span className="text-light-100 font-medium">View Details</span>
            <motion.span 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neo text-dark-900"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowRight />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default UseCaseCard;