import React, { useState } from 'react';
import SectionTitle from '../../components/ui/SectionTitle';
import BlogCard from '../../components/ui/BlogCard';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { blogPosts } from '../../data/blogPosts'; // Usa i dati centralizzati

// Categorie (aggiungi se vuoi filtrare)
const categories = [
  'All',
  ...Array.from(new Set(blogPosts.map(post => post.category).filter(Boolean)))
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtro per categoria e ricerca
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <ScrollReveal key={post.slug || index}>
                  <BlogCard {...post} />
                </ScrollReveal>
              ))}
            </div>
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