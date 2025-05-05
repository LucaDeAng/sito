import React from 'react';
import Hero from './Hero';
import FeaturedBlogs from './FeaturedBlogs';
import FeaturedUseCases from './FeaturedUseCases';
import AboutSection from './AboutSection';
import Newsletter from './Newsletter';

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedUseCases />
      <FeaturedBlogs />
      <AboutSection />
      <Newsletter />
    </>
  );
};

export default HomePage;