import React, { useState } from 'react';
import SectionTitle from '../../components/ui/SectionTitle';
import BlogCard from '../../components/ui/BlogCard';
import ScrollReveal from '../../components/animations/ScrollReveal';

// Mock data - expanded from our featured blogs
const blogPosts = [
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
  {
    id: 4,
    title: 'Multimodal AI Systems: Beyond Text Generation',
    excerpt: 'How combining different modalities like text, images, and audio is creating more powerful and versatile AI systems.',
    date: '2025-03-25',
    readTime: 8,
    category: 'AI Research',
    image: 'https://images.unsplash.com/photo-1670422564055-9a631fd5574e',
    slug: 'multimodal-ai-systems',
  },
  {
    id: 5,
    title: 'Fine-tuning Large Language Models for Specialized Tasks',
    excerpt: 'A practical guide to adapting pre-trained large language models for domain-specific applications with limited data.',
    date: '2025-03-18',
    readTime: 11,
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1673033461945-3fc3e12b5932',
    slug: 'fine-tuning-llms-specialized-tasks',
  },
  {
    id: 6,
    title: 'The Rise of AI Agents: Autonomous Systems in Practice',
    excerpt: 'Exploring how AI agents are evolving from passive tools to autonomous systems that can perform complex tasks with minimal supervision.',
    date: '2025-03-10',
    readTime: 9,
    category: 'Technology Trends',
    image: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f',
    slug: 'rise-of-ai-agents',
  },
  {
    id: 7,
    title: 'Creative Collaboration Between Humans and AI',
    excerpt: 'How artists, writers, and designers are finding new ways to collaborate with AI to enhance their creative process rather than replace it.',
    date: '2025-03-01',
    readTime: 7,
    category: 'Creativity',
    image: 'https://images.unsplash.com/photo-1633186221308-88d27f925983',
    slug: 'creative-collaboration-humans-ai',
  },
  {
    id: 8,
    title: 'Building Responsible AI Systems: A Framework',
    excerpt: 'A comprehensive approach to developing AI systems that are ethical, fair, transparent, and beneficial for all stakeholders.',
    date: '2025-02-20',
    readTime: 10,
    category: 'Ethics',
    image: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1',
    slug: 'responsible-ai-systems-framework',
  }
];

// Category list for filtering
const categories = [
  'All',
  'AI Research',
  'Ethics',
  'Tutorials',
  'Technology Trends',
  'Creativity'
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <section className="pt-36 pb-20 bg-dark-900">
        <div className="container-section">
          <SectionTitle
            title="The GenAI Blog"
            subtitle="Insights & Explorations"
            showGlitch={true}
          />
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-light-200 text-body-lg">
              Exploring the frontiers of generative AI through practical insights, tutorials, ethical discussions, and creative experiments.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 glass p-6 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input flex-grow"
              />
              
              <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? 'bg-neo text-dark-900 font-medium'
                        : 'bg-dark-800 text-light-300 hover:bg-dark-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Posts */}
      <section className="py-16 bg-dark-950">
        <div className="container-section">
          {filteredPosts.length > 0 ? (
            <>
              {/* Featured post */}
              <div className="mb-12">
                <ScrollReveal>
                  <BlogCard {...filteredPosts[0]} variant="featured" />
                </ScrollReveal>
              </div>
              
              {/* Grid of remaining posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post, index) => (
                  <ScrollReveal key={post.id} delay={0.1 * (index % 3)}>
                    <BlogCard {...post} />
                  </ScrollReveal>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-heading text-light-200 mb-4">No articles found</h3>
              <p className="text-light-300">
                Try adjusting your search criteria or browse all categories.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-6 btn btn-outline"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;