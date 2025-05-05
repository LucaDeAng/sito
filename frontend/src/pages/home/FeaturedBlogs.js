import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogCard from '../../components/ui/BlogCard';
import SectionTitle from '../../components/ui/SectionTitle';
import ScrollReveal from '../../components/animations/ScrollReveal';

// Mock data
const featuredBlogs = [
  {
    id: 1,
    title: 'The Evolution of Generative AI Models',
    excerpt: 'Exploring how generative AI models have evolved from GPT to more advanced architectures, and what that means for creators and developers.',
    date: '2025-04-28',
    readTime: 7,
    category: 'AI Research',
    image: 'https://images.unsplash.com/photo-1701883775599-dacb74d62614',
    slug: 'evolution-of-generative-ai-models',
  },
  {
    id: 2,
    title: 'Ethical Considerations in AI Art Creation',
    excerpt: 'A deep dive into the ethical implications of using AI for art generation, and how to navigate the complex landscape of attribution and ownership.',
    date: '2025-04-15',
    readTime: 9,
    category: 'Ethics',
    image: 'https://images.unsplash.com/photo-1684891882081-5883355250a9',
    slug: 'ethical-considerations-in-ai-art-creation',
  },
  {
    id: 3,
    title: 'Prompt Engineering: The New Programming Paradigm',
    excerpt: 'How crafting effective prompts has become a crucial skill in the age of large language models, and techniques to master this art.',
    date: '2025-04-07',
    readTime: 6,
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    slug: 'prompt-engineering-new-programming-paradigm',
  },
];

const FeaturedBlogs = () => {
  return (
    <section className="py-24 bg-dark-900">
      <div className="container-section">
        <SectionTitle 
          title="Latest Insights"
          subtitle="The Blog"
          showGlitch={true}
        />
        
        <div className="grid grid-cols-1 gap-8 mb-12">
          <ScrollReveal delay={0.1}>
            <BlogCard 
              {...featuredBlogs[0]} 
              variant="featured" 
            />
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredBlogs.slice(1, 3).map((blog, index) => (
            <ScrollReveal key={blog.id} delay={0.2 + index * 0.1}>
              <BlogCard {...blog} />
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/blog" className="btn btn-outline">
              View All Articles
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;