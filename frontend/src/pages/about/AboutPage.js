import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/animations/ScrollReveal';
import GlitchText from '../../components/ui/GlitchText';
import SectionTitle from '../../components/ui/SectionTitle';
import { FiCode, FiFeather, FiLayers, FiBookOpen, FiUsers, FiStar } from 'react-icons/fi';

const AboutPage = () => {
  const skills = [
    { 
      icon: <FiCode />,
      title: 'AI Implementation',
      description: 'Practical experience in deploying and integrating generative AI systems into real-world applications.'
    },
    {
      icon: <FiFeather />,
      title: 'Creative Direction',
      description: 'Guiding the artistic and conceptual aspects of AI-assisted creative projects for maximum impact.'
    },
    {
      icon: <FiLayers />,
      title: 'Prompt Engineering',
      description: 'Expert in developing sophisticated prompts that elicit optimal responses from large language models.'
    },
    {
      icon: <FiBookOpen />,
      title: 'AI Research',
      description: 'Constant exploration of emerging generative AI techniques and their practical applications.'
    },
    {
      icon: <FiUsers />,
      title: 'AI Education',
      description: 'Teaching complex AI concepts in accessible ways to empower creators and technologists.'
    },
    {
      icon: <FiStar />,
      title: 'Human-AI Collaboration',
      description: 'Designing workflows that enhance human capabilities rather than replace them.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-neo blur-[150px]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left">
                <div className="space-y-6">
                  <h1 className="text-title-lg text-light-100 leading-none mb-4">
                    Hello, I'm <br />
                    <GlitchText className="text-gradient" intensity="high">
                      Luca De Angelis
                    </GlitchText>
                  </h1>
                  
                  <p className="text-body-lg text-light-200">
                    I'm a generative AI specialist, exploring the intersection of artificial intelligence, creativity, and human potential. My work focuses on practical applications of AI that enhance rather than replace human capabilities.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <span className="glass px-4 py-2 rounded-full text-neo">AI Researcher</span>
                    <span className="glass px-4 py-2 rounded-full text-primary">Creative Technologist</span>
                    <span className="glass px-4 py-2 rounded-full text-accent">Writer</span>
                    <span className="glass px-4 py-2 rounded-full text-light-100">Educator</span>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <div className="glass p-1 rounded-lg rotate-random-1 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee" 
                    alt="Luca De Angelis" 
                    className="rounded-lg w-full h-auto"
                  />
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-neo/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bio Section */}
      <section className="py-20 bg-dark-950">
        <div className="container-section">
          <SectionTitle 
            title="My Journey" 
            subtitle="About Me"
          />
          
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="space-y-6 text-light-200 text-body-lg">
                <p>
                  My fascination with artificial intelligence began during my studies in computer science, where I was captivated by the potential for machines to augment human creativity rather than simply automate routine tasks.
                </p>
                
                <p>
                  After completing my education, I worked with several technology startups, helping them implement early machine learning solutions. As generative AI models became more sophisticated, I transitioned to focus exclusively on this exciting field, with a particular emphasis on practical applications in creative industries.
                </p>
                
                <p>
                  Today, I split my time between implementing custom AI solutions for clients, conducting independent research, and sharing my knowledge through this blog and various speaking engagements. I'm particularly interested in how generative AI can enhance creative expression, improve education, and solve complex problems across disciplines.
                </p>
                
                <p>
                  My approach combines technical expertise with a deep appreciation for human creativity and ethical considerations. I believe the most powerful AI applications are those that amplify human potential rather than diminish it.
                </p>
                
                <div className="glass p-6 rounded-lg my-8 border border-light-300/10">
                  <blockquote className="font-serif text-xl italic text-light-100">
                    "The goal isn't to replace human creativity with artificial intelligence, but to create a synergy where both are enhanced through collaboration."
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-20 bg-dark-900">
        <div className="container-section">
          <SectionTitle 
            title="My Expertise" 
            subtitle="Skills & Specialties"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <ScrollReveal key={index} delay={0.1 * index}>
                <motion.div 
                  className="glass p-6 rounded-lg border border-light-300/10 h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-light-100 text-2xl mb-4">
                    {skill.icon}
                  </div>
                  <h3 className="text-subheading text-light-100 mb-2">{skill.title}</h3>
                  <p className="text-light-300">{skill.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-20 bg-dark-950">
        <div className="container-section">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-title mb-6 text-gradient">Let's Connect</h2>
              <p className="text-light-200 text-body-lg mb-8">
                Interested in collaborating on a project, booking a speaking engagement, or just discussing the future of generative AI? I'd love to hear from you.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="/contact" className="btn btn-neo">
                  Get in Touch
                </a>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;