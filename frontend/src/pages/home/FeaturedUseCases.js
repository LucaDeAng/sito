import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UseCaseCard from '../../components/ui/UseCaseCard';
import SectionTitle from '../../components/ui/SectionTitle';
import ScrollReveal from '../../components/animations/ScrollReveal';

// Mock data
const featuredUseCases = [
  {
    id: 1,
    title: 'AI-Powered Content Creation Pipeline',
    description: 'A streamlined workflow that combines LLMs, image generation, and human editing to accelerate content production while maintaining quality.',
    image: 'https://images.unsplash.com/photo-1678885194881-843a9690ad31',
    technologies: ['GPT-4', 'DALL-E 3', 'LangChain'],
    slug: 'ai-powered-content-creation',
  },
  {
    id: 2,
    title: 'Intelligent Document Analysis System',
    description: 'Automated extraction and analysis of information from complex documents, with semantic understanding and context-aware summarization.',
    image: 'https://images.unsplash.com/photo-1638136257268-61cc1262c853',
    technologies: ['OCR', 'NLP', 'Vector Search'],
    slug: 'intelligent-document-analysis',
  },
  {
    id: 3,
    title: 'Personalized Learning Experience',
    description: 'Adaptive educational platform that tailors content and challenges to individual learning styles, strengths, and areas for improvement.',
    image: 'https://images.unsplash.com/photo-1713175666384-7eb32a3c7e83',
    technologies: ['ML Recommendation', 'NLU', 'Educational AI'],
    slug: 'personalized-learning-platform',
  },
];

const FeaturedUseCases = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-dark-950 to-dark-900 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-900 to-transparent"></div>
      
      <div className="container-section relative z-10">
        <SectionTitle 
          title="GenAI Applications"
          subtitle="Use Cases"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredUseCases.map((useCase, index) => (
            <ScrollReveal 
              key={useCase.id} 
              delay={0.1 + index * 0.1}
              direction={index % 2 === 0 ? 'up' : 'down'}
            >
              <UseCaseCard {...useCase} />
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/usecases" className="btn btn-neo">
              Explore All Use Cases
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUseCases;