import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import GlitchText from '../../components/ui/GlitchText';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the hero background
      gsap.to(heroRef.current, {
        backgroundPosition: '0% 100%',
        duration: 20,
        ease: 'linear',
        repeat: -1,
        yoyo: true
      });
      
      // Create a typing effect
      const text = textRef.current;
      if (text) {
        const characters = text.textContent.split('');
        text.textContent = '';
        
        characters.forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          text.appendChild(span);
          
          gsap.to(span, {
            opacity: 1,
            duration: 0.1,
            delay: 1 + index * 0.05,
            ease: 'power1.in'
          });
        });
      }
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950 py-20"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1708191514588-ee15ee02d2dc')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/90 via-dark-900/80 to-dark-800/90"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <GlitchText
              className="text-neo font-mono uppercase tracking-wider mb-4 inline-block"
              intensity="high"
            >
              Luca De Angelis
            </GlitchText>
            
            <h1 className="text-title-xxl text-light-100 font-grotesk leading-none mb-6">
              Exploring the <br />
              <span className="text-gradient">Generative AI</span> Frontier
            </h1>
            
            <p ref={textRef} className="text-body-lg text-light-200 mb-8 max-w-2xl mx-auto">
              Welcome to my digital laboratory where AI, creativity, and human expertise converge to create new possibilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blog" className="btn btn-primary">
                Read the Blog
              </Link>
              <Link to="/usecases" className="btn btn-outline">
                Explore Use Cases
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass rounded-xl p-6 rotate-random-1 max-w-sm mx-auto"
          >
            <p className="text-light-200 font-retro">
              <span className="text-primary">function</span> <span className="text-neo">exploreAI</span>() {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-accent">const</span> innovation = <span className="text-primary">await</span> creativity.merge(technology);
              <br />
              &nbsp;&nbsp;<span className="text-primary">return</span> innovation.transform(world);
              <br />
              {"}"}
            </p>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-light-300"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;