import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/animations/ScrollReveal';
import GlitchText from '../../components/ui/GlitchText';

const AboutSection = () => {
  return (
    <section className="py-24 bg-dark-800 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-neo blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-accent blur-[100px]"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="glass p-1 rounded-lg rotate-random-2">
              <img 
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee" 
                alt="Luca De Angelis" 
                className="rounded-lg w-full h-auto"
              />
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-neo/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-neo font-mono uppercase tracking-wider mb-2">About Me</h3>
              <h2 className="text-title mb-6 text-light-100">
                <GlitchText intensity="low" className="mr-2">AI</GlitchText> Explorer & Creative Technologist
              </h2>
              
              <div className="space-y-4 text-light-200 text-body-lg mb-8">
                <p>
                  I'm Luca De Angelis, a generative AI specialist passionate about exploring the intersection of artificial intelligence, art, and human creativity.
                </p>
                <p>
                  With a background in both technical implementation and creative direction, I bridge the gap between cutting-edge AI capabilities and practical applications that enhance human potential.
                </p>
                <p>
                  Through this platform, I share insights from my experiments, research, and real-world projects in the generative AI space.
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link to="/about" className="btn btn-outline">
                  Learn More About Me
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;