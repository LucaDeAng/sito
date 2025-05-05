import React, { useState } from 'react';
import SectionTitle from '../../components/ui/SectionTitle';
import UseCaseCard from '../../components/ui/UseCaseCard';
import ScrollReveal from '../../components/animations/ScrollReveal';

// Mock data - expanded from our featured use cases
const useCases = [
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
  {
    id: 4,
    title: 'AI-Enhanced Creative Collaboration',
    description: 'A platform that bridges the gap between AI capabilities and human creativity, enabling artists and designers to co-create with intelligent systems.',
    image: 'https://images.unsplash.com/photo-1609921205586-7e8a57516512',
    technologies: ['Creative ML', 'Diffusion Models', 'Real-time Collaboration'],
    slug: 'ai-enhanced-creative-collaboration',
  },
  {
    id: 5,
    title: 'Conversational Knowledge Base',
    description: 'An intelligent system that transforms company documentation into a conversational interface, making information retrieval intuitive and efficient.',
    image: 'https://images.unsplash.com/photo-1639071725433-b1dbca734c5b',
    technologies: ['RAG', 'LLM Fine-tuning', 'Knowledge Graphs'],
    slug: 'conversational-knowledge-base',
  },
  {
    id: 6,
    title: 'Multimodal Health Assessment',
    description: 'A system that analyzes multiple data types (text, images, audio) to provide preliminary health assessments and triage recommendations.',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881',
    technologies: ['Multimodal ML', 'Healthcare AI', 'Privacy-Preserving ML'],
    slug: 'multimodal-health-assessment',
  },
  {
    id: 7,
    title: 'Automated Code Assistant',
    description: 'An intelligent programming partner that understands code context, suggests improvements, and helps developers maintain best practices.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    technologies: ['Code LLMs', 'Static Analysis', 'Code Generation'],
    slug: 'automated-code-assistant',
  },
  {
    id: 8,
    title: 'Synthetic Data Generation Platform',
    description: 'A system for creating realistic but synthetic datasets that preserve statistical properties while protecting privacy and addressing bias.',
    image: 'https://images.unsplash.com/photo-1621075160523-b936ad96132a',
    technologies: ['GANs', 'Differential Privacy', 'Data Augmentation'],
    slug: 'synthetic-data-generation',
  },
];

// Technology tags for filtering
const technologies = [
  'All',
  'GPT-4',
  'DALL-E 3',
  'LangChain',
  'OCR',
  'NLP',
  'Vector Search',
  'ML Recommendation',
  'NLU',
  'Creative ML',
  'RAG',
  'Multimodal ML',
  'Code LLMs',
  'GANs'
];

const UseCasesPage = () => {
  const [selectedTech, setSelectedTech] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter use cases based on technology and search query
  const filteredUseCases = useCases.filter(useCase => {
    const matchesTech = selectedTech === 'All' || useCase.technologies.includes(selectedTech);
    const matchesSearch = useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          useCase.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTech && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <section className="pt-36 pb-20 bg-dark-900">
        <div className="container-section">
          <SectionTitle
            title="GenAI in Action"
            subtitle="Use Cases & Applications"
            showGlitch={true}
          />
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-light-200 text-body-lg">
              Exploring practical applications of generative AI across industries, with real-world examples and implementation insights.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 glass p-6 rounded-lg">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Search use cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
              
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 7).map((tech, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedTech === tech
                        ? 'bg-neo text-dark-900 font-medium'
                        : 'bg-dark-800 text-light-300 hover:bg-dark-700'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
                <div className="relative group">
                  <button className="px-4 py-2 rounded-md bg-dark-800 text-light-300 hover:bg-dark-700">
                    More...
                  </button>
                  <div className="absolute z-50 left-0 mt-2 w-48 hidden group-hover:block">
                    <div className="bg-dark-800 rounded-md shadow-lg p-2">
                      {technologies.slice(7).map((tech, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTech(tech)}
                          className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                            selectedTech === tech
                              ? 'bg-neo text-dark-900 font-medium'
                              : 'text-light-300 hover:bg-dark-700'
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases Grid */}
      <section className="py-16 bg-dark-950">
        <div className="container-section">
          {filteredUseCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUseCases.map((useCase, index) => (
                <ScrollReveal key={useCase.id} delay={0.1 * (index % 3)}>
                  <UseCaseCard {...useCase} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-heading text-light-200 mb-4">No use cases found</h3>
              <p className="text-light-300">
                Try adjusting your search criteria or browse all technologies.
              </p>
              <button 
                onClick={() => {
                  setSelectedTech('All');
                  setSearchQuery('');
                }}
                className="mt-6 btn btn-outline"
              >
                View All Use Cases
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UseCasesPage;