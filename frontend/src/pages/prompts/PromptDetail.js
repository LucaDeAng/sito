import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShare, FiCopy, FiHeart } from 'react-icons/fi';
import ScrollReveal from '../../components/animations/ScrollReveal';
import PromptCard from './PromptCard';

// Mock data - will be replaced with API fetch based on ID
const mockPrompts = [
  {
    id: '1',
    title: 'Detailed Article Outline Generator',
    description: 'Creates a comprehensive, structured outline for any article topic with sections, subsections, and key points to cover.',
    category: 'Content Creation',
    tags: ['writing', 'article', 'outline'],
    likes: 42,
    views: 321,
    promptText: `I want you to create a detailed article outline about [TOPIC]. The outline should include:

1. Introduction
   - Hook to grab the reader's attention
   - Background context on the topic
   - Clear thesis statement

2. Main sections (at least 3-5)
   - Each with a clear subheading
   - 3-4 subsections under each main section
   - Key points, facts, or examples to include
   - Potential sources or references to cite

3. Conclusion
   - Summary of main points
   - Implications or future outlook
   - Call to action or final thought

Format the outline with clear hierarchical structure using numbers and bullet points. Include notes about what research might be needed.`,
  },
  {
    id: '2',
    title: 'Creative Story Generator with Character Development',
    description: 'Guides an AI to create engaging stories with well-developed characters, compelling plots, and vivid settings.',
    category: 'Creative Writing',
    tags: ['fiction', 'storytelling', 'characters'],
    likes: 78,
    views: 542,
    promptText: `Create a short story based on the following parameters:

Main Character: [brief description of protagonist]
Setting: [place and time period]
Genre: [genre type]
Theme: [central theme]

Develop the story with:
1. A distinctive voice for the protagonist
2. At least one supporting character with their own motivations
3. A clear conflict or challenge
4. Descriptive language for the setting
5. A resolution that reflects the theme

The story should be between 800-1200 words and organized into clear scenes. Use dialogue to reveal character and advance the plot. Include at least one unexpected moment or twist.`,
  },
  // Additional prompts from the previous mock data would be included here
];

// Mock related prompts based on category and tags
const getRelatedPrompts = (currentPrompt) => {
  return mockPrompts.filter(prompt => 
    prompt.id !== currentPrompt.id && 
    (prompt.category === currentPrompt.category || 
     prompt.tags.some(tag => currentPrompt.tags.includes(tag)))
  ).slice(0, 3);
};

const PromptDetail = () => {
  const { id } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [relatedPrompts, setRelatedPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    // In production, this would fetch from API
    const fetchPrompt = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const foundPrompt = mockPrompts.find(p => p.id === id);
        setPrompt(foundPrompt);
        setRelatedPrompts(getRelatedPrompts(foundPrompt));
        setIsLoading(false);
      }, 800);
    };
    
    fetchPrompt();
  }, [id]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleLike = async () => {
    // In production, this would call an API endpoint
    if (!liked) {
      setPrompt(prev => ({
        ...prev,
        likes: prev.likes + 1
      }));
      setLiked(true);
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 pt-36 flex justify-center">
        <div className="w-16 h-16 border-4 border-light-300/20 border-t-neo rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!prompt) {
    return (
      <div className="min-h-screen bg-dark-950 pt-36">
        <div className="container-section text-center">
          <h2 className="text-title text-light-100 mb-4">Prompt Not Found</h2>
          <p className="text-light-300 mb-8">The prompt you're looking for doesn't exist or has been removed.</p>
          <Link to="/prompts" className="btn btn-outline">
            Back to Prompts
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <section className="pt-36 pb-16 bg-dark-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/prompts" className="inline-flex items-center text-light-300 hover:text-neo mb-8 transition-colors">
              <FiArrowLeft className="mr-2" />
              Back to Prompts
            </Link>
            
            <ScrollReveal>
              <div className="glass p-8 rounded-lg border border-light-300/10">
                <div className="flex flex-wrap gap-4 items-start justify-between mb-6">
                  <div>
                    <span className="text-neo text-caption block mb-2">{prompt.category}</span>
                    <h1 className="text-title text-light-100">{prompt.title}</h1>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button
                      onClick={handleShare}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-800 text-light-300 hover:bg-light-300/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiShare />
                    </motion.button>
                    
                    <motion.button
                      onClick={handleLike}
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${liked ? 'bg-primary/20 text-primary' : 'bg-dark-800 text-light-300 hover:bg-light-300/10'} transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiHeart />
                    </motion.button>
                  </div>
                </div>
                
                <p className="text-light-200 text-body-lg mb-6">{prompt.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {prompt.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-body-sm bg-dark-800 px-3 py-1 rounded-full text-light-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="bg-dark-800 p-6 rounded-lg relative">
                  <motion.button
                    onClick={handleCopy}
                    className={`absolute top-4 right-4 px-3 py-1.5 rounded-md flex items-center ${copied ? 'bg-neo text-dark-900' : 'bg-dark-700 text-light-300 hover:bg-dark-600'} transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiCopy className="mr-2" />
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                  
                  <pre className="font-mono text-light-200 whitespace-pre-wrap overflow-x-auto">
                    {prompt.promptText}
                  </pre>
                </div>
                
                <div className="mt-8 flex flex-wrap items-center justify-between text-light-300 text-body-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FiHeart className="text-primary" />
                      {prompt.likes} likes
                    </span>
                    <span>{prompt.views} views</span>
                  </div>
                  
                  <button 
                    onClick={handleLike}
                    className={`px-4 py-2 rounded-full border ${liked ? 'border-primary text-primary' : 'border-light-300/30 hover:border-primary hover:text-primary'} transition-colors`}
                  >
                    {liked ? 'Liked' : 'Like this prompt'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Related Prompts */}
      {relatedPrompts.length > 0 && (
        <section className="py-16 bg-dark-950">
          <div className="container-section">
            <h2 className="text-heading text-light-100 mb-10">Related Prompts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPrompts.map((relatedPrompt, index) => (
                <ScrollReveal key={relatedPrompt.id} delay={0.1 * index}>
                  <PromptCard {...relatedPrompt} onLike={handleLike} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PromptDetail;