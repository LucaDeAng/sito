import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/ui/SectionTitle';
import ScrollReveal from '../../components/animations/ScrollReveal';
import PromptCard from './PromptCard';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Mock data for now - will be replaced with API fetch
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
  {
    id: '3',
    title: 'Comprehensive Data Analysis Plan',
    description: 'Creates a detailed plan for analyzing a dataset, including preprocessing steps, visualization approaches, and statistical methods.',
    category: 'Data Science',
    tags: ['analysis', 'statistics', 'visualization'],
    likes: 56,
    views: 412,
    promptText: `Create a comprehensive data analysis plan for a dataset about [TOPIC/DOMAIN] with the following characteristics:
- Approximate size: [number] records with [number] features
- Key variables include: [list main variables]
- Analysis goal: [what insights we're trying to extract]

Your plan should include:

1. Data Preprocessing
   - Handling missing values
   - Feature selection and engineering
   - Normalization/standardization approach
   - Outlier detection and handling strategy

2. Exploratory Data Analysis
   - Key visualizations to create (specify chart types and variables)
   - Summary statistics to generate
   - Correlation analyses to perform

3. Statistical Analysis
   - Appropriate statistical tests and models
   - Hypotheses to test
   - Benchmarks for evaluation

4. Visualization Strategy
   - Dashboard components
   - Key insights to highlight
   - Visualization best practices for this specific data

5. Interpretation Framework
   - How to translate findings into actionable insights
   - Potential limitations and how to address them
   - Framework for presenting results to stakeholders

Include rationale for your recommendations and any alternative approaches worth considering.`,
  },
  {
    id: '4',
    title: 'Product Design Critique Framework',
    description: 'A structured framework for evaluating and providing constructive criticism on product designs, focusing on usability, aesthetics, and business goals.',
    category: 'Design',
    tags: ['critique', 'UX', 'product'],
    likes: 34,
    views: 267,
    promptText: `I'd like you to perform a comprehensive design critique of [PRODUCT/DESIGN] using the following framework:

1. First Impressions (emotional response)
   - Immediate reactions
   - Visual impact
   - Emotional resonance

2. Usability Analysis
   - User flow clarity
   - Interaction patterns
   - Accessibility considerations
   - Potential pain points

3. Visual Design Evaluation
   - Color theory application
   - Typography hierarchy and readability
   - Layout balance and visual rhythm
   - Consistency with brand guidelines
   - Use of space and contrast

4. Business Goal Alignment
   - How the design supports core business objectives
   - Conversion optimization elements
   - Competitive differentiation

5. Technical Feasibility
   - Implementation challenges
   - Responsive/adaptive considerations
   - Performance implications

For each section, provide:
- Specific observations (both positive aspects and opportunities)
- Recommendations for improvement
- Priority level for each recommendation (high/medium/low)

Conclude with 3-5 key actionable takeaways and an overall assessment.`,
  },
  {
    id: '5',
    title: 'Socratic Teaching Dialogue Generator',
    description: 'Creates educational dialogues in the Socratic method to help learners discover concepts through guided questioning.',
    category: 'Education',
    tags: ['teaching', 'socratic', 'dialogue'],
    likes: 61,
    views: 389,
    promptText: `Create a Socratic dialogue to teach the concept of [CONCEPT] in [SUBJECT].

The dialogue should be between a teacher and a student who has [LEVEL OF UNDERSTANDING] about the subject.

Follow these guidelines:
1. Begin with a question that reveals the student's current understanding
2. Use targeted questions that lead the student toward discovering the concept themselves
3. Include moments of:
   - Confusion that are productively resolved
   - Incorrect assumptions that are gently challenged
   - Breakthrough realizations
4. Build complexity gradually
5. Incorporate real-world examples or analogies
6. End with reflective questions that consolidate learning

The questions should follow a progression from:
- Basic concept clarification
- Application to simple cases
- Analysis of components
- Evaluation of implications
- Creation of new examples by the student

Make the dialogue conversational and natural, with the teacher responding thoughtfully to the student's specific answers rather than following a rigid script.`,
  },
  {
    id: '6',
    title: 'AI Image Generation Prompt Engineering',
    description: 'A structured framework for creating detailed prompts for AI image generators like DALL-E, Midjourney, or Stable Diffusion.',
    category: 'AI Art',
    tags: ['image', 'DALL-E', 'Midjourney'],
    likes: 92,
    views: 763,
    promptText: `Create a detailed image generation prompt based on these parameters:

Subject: [main subject]
Style: [artistic style or influence]
Mood: [emotional tone]
Lighting: [lighting conditions]
Color Palette: [dominant colors]
Composition: [framing and arrangement]
Details: [specific elements to include]

Format the prompt in this structure:

1. Main description (what the image fundamentally is)
2. Style specifications (artistic influences, rendering technique)
3. Atmosphere and mood elements
4. Technical parameters (aspect ratio, quality modifiers)
5. Additional details for precision

Example format:
"[Subject] in [setting], [action/pose], [style description], [lighting], [color palette], [composition details], [additional atmospheric elements], [quality modifiers]"

Provide three variations of the prompt with increasing levels of detail:
- Basic (25-30 words)
- Detailed (50-60 words)
- Advanced (80-100 words)

Also include 2-3 alternative style suggestions that would work well with this concept.`,
  },
];

// Categories for filtering
const categories = [
  'All',
  'Content Creation',
  'Creative Writing',
  'Data Science',
  'Design',
  'Education',
  'AI Art'
];

const PromptsPage = () => {
  const [prompts, setPrompts] = useState(mockPrompts);
  const [filteredPrompts, setFilteredPrompts] = useState(mockPrompts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('popular'); // popular, newest, views
  const [isLoading, setIsLoading] = useState(false);

  // Fetch prompts from API
  useEffect(() => {
    // For now, we're using mock data
    // In production, this would be replaced with an API call
    
    // async function fetchPrompts() {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/prompts`);
    //     const data = await response.json();
    //     setPrompts(data);
    //     setFilteredPrompts(data);
    //   } catch (error) {
    //     console.error('Error fetching prompts:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    
    // fetchPrompts();
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setPrompts(mockPrompts);
      setFilteredPrompts(mockPrompts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort prompts
  useEffect(() => {
    let result = [...prompts];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(prompt => prompt.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(prompt => 
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    if (sortOption === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === 'newest') {
      // In a real app, this would sort by date
      // For mock data, we'll just use the reverse of the ID order
      result.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'views') {
      result.sort((a, b) => b.views - a.views);
    }
    
    setFilteredPrompts(result);
  }, [prompts, selectedCategory, searchQuery, sortOption]);

  const handleLike = async (id) => {
    // In production, this would call an API endpoint
    // For now, we'll just update the local state
    setPrompts(prevPrompts =>
      prevPrompts.map(prompt =>
        prompt.id === id
          ? { ...prompt, likes: prompt.likes + 1 }
          : prompt
      )
    );
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <section className="pt-36 pb-20 bg-dark-900">
        <div className="container-section">
          <SectionTitle
            title="AI Prompt Library"
            subtitle="GenAI Prompts"
            showGlitch={true}
          />
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-light-200 text-body-lg">
              Discover and share effective prompts for various generative AI tasks. Browse by category, save your favorites, or contribute your own prompts to the community.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 glass p-6 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-400" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="input bg-dark-800 border-dark-700 text-light-100"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="views">Most Viewed</option>
                </select>
                
                <button className="btn btn-outline flex items-center gap-2">
                  <FiFilter />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                
                <Link to="/prompts/new" className="btn btn-neo flex items-center gap-2">
                  <FiPlus />
                  <span className="hidden sm:inline">Add Prompt</span>
                </Link>
              </div>
            </div>
            
            {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md transition-colors ${
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
      </section>
      
      {/* Prompts Grid */}
      <section className="py-16 bg-dark-950">
        <div className="container-section">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-light-300/20 border-t-neo rounded-full animate-spin"></div>
            </div>
          ) : filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrompts.map((prompt, index) => (
                <ScrollReveal key={prompt.id} delay={0.1 * (index % 3)}>
                  <PromptCard 
                    {...prompt}
                    onLike={handleLike}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-heading text-light-200 mb-4">No prompts found</h3>
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
                View All Prompts
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PromptsPage;