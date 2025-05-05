import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/animations/ScrollReveal';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Import the API service only when needed to avoid issues
      const apiService = (await import('../../services/api')).default;
      
      // Submit newsletter subscription
      await apiService.subscribeToNewsletter(email);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/20 via-accent/10 to-neo/20 blur-[100px] opacity-30"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 text-dark-900 opacity-20">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="container-section relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center glass rounded-xl p-10 border border-light-300/10">
            <h2 className="text-title text-gradient mb-6">Stay at the Cutting Edge</h2>
            <p className="text-light-200 text-body-lg mb-8">
              Subscribe to my newsletter for exclusive insights into generative AI developments, creative techniques, and early access to new experiments.
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="input flex-grow"
                  />
                  <motion.button
                    type="submit"
                    className="btn btn-primary whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
                <p className="text-light-400 text-body-sm mt-4">
                  No spam, unsubscribe at any time. Your data is protected.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-neo/20 p-6 rounded-lg"
              >
                <h3 className="text-neo text-heading mb-2">Thank You!</h3>
                <p className="text-light-100">
                  You've successfully subscribed to the newsletter. Check your inbox for a confirmation.
                </p>
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 text-dark-900 opacity-20">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default Newsletter;